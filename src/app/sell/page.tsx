'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import StatusModal, { StatusModalVariant } from '@/components/StatusModal';

const PHONE_DISPLAY = '(808) 555-0123';
const PHONE_LINK = '18085550123';

type ModalState = {
  variant: StatusModalVariant;
  title: string;
  message: string;
} | null;

export default function SellPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
    setFiles(selectedFiles);
  };

  const selectedSummary = useMemo(() => {
    if (files.length === 0) {
      return 'No files selected yet.';
    }

    if (files.length === 1) {
      return '1 file selected';
    }

    return `${files.length} files selected`;
  }, [files]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const email = String(formData.get('email') || '').trim();

    if (!name) {
      setModal({
        variant: 'error',
        title: 'Missing Name',
        message: 'Please enter your full name before submitting.',
      });
      return;
    }

    if (!phone && !email) {
      setModal({
        variant: 'error',
        title: 'Missing Contact Information',
        message: 'Please enter either a phone number or an email address.',
      });
      return;
    }

    if (files.length === 0) {
      setModal({
        variant: 'error',
        title: 'No Photos Selected',
        message:
          'Please upload at least one JPG, JPEG, PNG, or PDF file before submitting.',
      });
      return;
    }

    files.forEach((file) => {
      formData.append('photos', file);
    });

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/sell', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || 'Submission failed. Please try again.',
        );
      }

      setModal({
        variant: 'success',
        title: 'Submission Sent',
        message: [
          'Thank you. Your photos and contact information were sent successfully.',
          'Our expert will review them and respond within 24 hours.',
        ].join(' '),
      });

      setFiles([]);
      form.reset();
    } catch (error) {
      setModal({
        variant: 'error',
        title: 'Submission Failed',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="site-main">
      <section className="sell-page">
        <section className="sell-hero">
          <p className="sell-kicker">Sell to Us</p>

          <h1 className="sell-page-title">Sell to Us</h1>

          <p className="sell-page-lead">
            Send photos and your contact information for review.
          </p>

          <p className="sell-page-sublead">
            Our expert will provide an initial assessment within 24 hours.
          </p>
        </section>

        <section className="sell-steps">
          <div className="sell-steps-grid">
            <article className="sell-step-card">
              <p className="sell-step-label">Step 1</p>
              <h2 className="sell-step-title">Send Photos &amp; Contact Info</h2>
              <p className="sell-step-text">
                Upload clear photos and leave your name, phone number, or email.
              </p>
            </article>

            <div className="sell-step-arrow" aria-hidden="true">
              →
            </div>

            <article className="sell-step-card">
              <p className="sell-step-label">Step 2</p>
              <h2 className="sell-step-title">Expert Review Within 24 Hours</h2>
              <p className="sell-step-text">
                Our expert reviews the item and replies with an initial assessment.
              </p>
            </article>

            <div className="sell-step-arrow" aria-hidden="true">
              →
            </div>

            <article className="sell-step-card">
              <p className="sell-step-label">Step 3</p>
              <h2 className="sell-step-title">In-Person Discussion</h2>
              <p className="sell-step-text">
                If the item is a fit, we will speak with you in person about purchase by
                cash or check, or provide an assessment.
              </p>
            </article>
          </div>
        </section>

        <section className="sell-submit">
          <div className="sell-form-shell">
            <div className="sell-upload-block">
              <label htmlFor="fileUpload" className="sell-upload-area">
                <span className="sell-upload-heading">Click to Upload Photos</span>

                <span className="sell-upload-subtitle">
                  Add clear photos of the item you&rsquo;d like to sell.
                </span>

                <span className="sell-upload-button">↑ Click to Upload Photos</span>

                <span className="sell-upload-meta">
                  JPG, JPEG, PNG, or PDF, max 20MB total
                </span>

                <span className="sell-upload-note">
                  Please include overall views and detail photos when possible.
                </span>

                <input
                  id="fileUpload"
                  name="fileUpload"
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="sell-file-input"
                  onChange={handleFileChange}
                />
              </label>

              <p className="sell-file-summary">{selectedSummary}</p>

              {files.length > 0 && (
                <ul className="sell-file-list">
                  {files.map((file) => (
                    <li key={`${file.name}-${file.size}`}>
                      <span className="sell-file-name">{file.name}</span>
                      <span className="sell-file-size">
                        {(file.size / 1024 / 1024).toFixed(2)}
                        {' '}
                        MB
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <form className="sell-form" onSubmit={handleSubmit}>
              <div className="sell-form-grid">
                <div className="sell-field">
                  <label htmlFor="name">
                    Full Name
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Full Name"
                    />
                  </label>
                </div>

                <div className="sell-field">
                  <label htmlFor="phone">
                    Phone Number
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                    />
                  </label>
                </div>
              </div>

              <div className="sell-field sell-field-full">
                <label htmlFor="email">
                  Email Address
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                  />
                </label>
              </div>

              <div className="sell-field sell-field-full">
                <label htmlFor="note">
                  Leave a Note (Optional)
                  <textarea
                    id="note"
                    name="note"
                    rows={4}
                    placeholder="Leave a Note (Optional)"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="sell-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Photos'}
              </button>
            </form>

            <p className="sell-direct-text">
              Prefer to speak with us directly?
              {' '}
              <a href={`tel:${PHONE_LINK}`} className="sell-direct-link">
                Call
                {' '}
                {PHONE_DISPLAY}
              </a>
              .
            </p>
          </div>
        </section>
      </section>

      <StatusModal
        isOpen={modal !== null}
        variant={modal?.variant || 'info'}
        title={modal?.title || ''}
        message={modal?.message || ''}
        closeLabel="Close"
        onClose={() => setModal(null)}
      />
    </main>
  );
}
