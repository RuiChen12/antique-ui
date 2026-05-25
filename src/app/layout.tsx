import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Antique Gallery',
  description:
    'Antique buying and consignment services for Chinese and Asian antiques.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page-bg" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
