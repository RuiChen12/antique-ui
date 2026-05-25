import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MAX_TOTAL_SIZE = 20 * 1024 * 1024;

const ALLOWED_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf'];

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}

function isAllowedFile(file: File) {
  const fileName = file.name.toLowerCase();

  return ALLOWED_FILE_EXTENSIONS.some((extension) => (
    fileName.endsWith(extension)
  ));
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatFileSize(size: number) {
  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

function buildFileListHtml(files: File[]) {
  return files
    .map((file) => {
      const fileName = escapeHtml(file.name);
      const fileSize = formatFileSize(file.size);

      return `<li>${fileName} — ${fileSize}</li>`;
    })
    .join('');
}

function buildFileListText(files: File[]) {
  return files
    .map((file) => `- ${file.name} (${formatFileSize(file.size)})`)
    .join('\n');
}

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const sellToEmail = process.env.SELL_TO_EMAIL;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;

    if (!resendApiKey) {
      return NextResponse.json(
        { message: 'RESEND_API_KEY is missing.' },
        { status: 500 },
      );
    }

    if (!sellToEmail) {
      return NextResponse.json(
        { message: 'SELL_TO_EMAIL is missing.' },
        { status: 500 },
      );
    }

    if (!resendFromEmail) {
      return NextResponse.json(
        { message: 'RESEND_FROM_EMAIL is missing.' },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);
    const formData = await request.formData();

    const name = getStringValue(formData, 'name');
    const phone = getStringValue(formData, 'phone');
    const email = getStringValue(formData, 'email');
    const note = getStringValue(formData, 'note');

    const files = formData
      .getAll('photos')
      .filter((value): value is File => (
        value instanceof File && value.size > 0
      ));

    if (!name) {
      return NextResponse.json(
        { message: 'Please enter your full name.' },
        { status: 400 },
      );
    }

    if (!phone && !email) {
      return NextResponse.json(
        { message: 'Please enter either a phone number or an email address.' },
        { status: 400 },
      );
    }

    if (files.length === 0) {
      return NextResponse.json(
        { message: 'Please upload at least one photo or PDF.' },
        { status: 400 },
      );
    }

    let totalSize = 0;

    for (const file of files) {
      totalSize += file.size;

      if (!isAllowedFile(file)) {
        return NextResponse.json(
          {
            message: 'Only JPG, JPEG, PNG, and PDF files are allowed.',
          },
          { status: 400 },
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            message: `${file.name} is larger than 20MB.`,
          },
          { status: 400 },
        );
      }
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      return NextResponse.json(
        {
          message:
            'The total upload size is too large. Please keep all files under 20MB total.',
        },
        { status: 400 },
      );
    }

    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      })),
    );

    const submittedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Pacific/Honolulu',
    }).format(new Date());

    const html = `
      <h2>New Antique Submission</h2>

      <p>A new Sell to Us form was submitted from the Antique Gallery website.</p>

      <table cellpadding="8" cellspacing="0" border="0">
        <tr>
          <td><strong>Name</strong></td>
          <td>${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td><strong>Phone</strong></td>
          <td>${escapeHtml(phone || 'Not provided')}</td>
        </tr>
        <tr>
          <td><strong>Email</strong></td>
          <td>${escapeHtml(email || 'Not provided')}</td>
        </tr>
        <tr>
          <td><strong>Submitted At</strong></td>
          <td>${escapeHtml(submittedAt)} Hawaii Time</td>
        </tr>
      </table>

      <h3>Note</h3>
      <p>${escapeHtml(note || 'No note provided.')}</p>

      <h3>Attached Files</h3>
      <ul>
        ${buildFileListHtml(files)}
      </ul>
    `;

    const text = `
New Antique Submission

Name: ${name}
Phone: ${phone || 'Not provided'}
Email: ${email || 'Not provided'}
Submitted At: ${submittedAt} Hawaii Time

Note:
${note || 'No note provided.'}

Attached Files:
${buildFileListText(files)}
    `.trim();

    const { error } = await resend.emails.send({
      from: resendFromEmail,
      to: [sellToEmail],
      subject: `New antique submission from ${name}`,
      html,
      text,
      attachments,
    });

    if (error) {
      return NextResponse.json(
        { message: 'Failed to send email. Please try again.' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: 'Submission sent successfully.',
    });
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
