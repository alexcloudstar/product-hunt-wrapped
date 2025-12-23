import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Product Hunt Wrapped 2025 | Your Maker Year in Review',
  description:
    'Discover your 2025 Product Hunt impact. Analyze your launches, upvotes, and global rankings with a personalized data-driven story.',
  keywords: [
    'Product Hunt',
    'Wrapped 2025',
    'Maker Stats',
    'ShipFast',
    'Tech Trends',
    'Startup Data',
  ],
  authors: [{ name: 'Alex Cloudstar' }],
  openGraph: {
    title: 'Product Hunt Wrapped 2025',
    description:
      'I just generated my Product Hunt 2025 Maker Recap. Check out my stats!',
    url: 'https://github.com/alexcloudstar/product-hunt-wrap',
    siteName: 'PH Wrapped',
    images: [
      {
        url: '/og-image.png', // Make sure to place your logo/banner in the public folder
        width: 1200,
        height: 630,
        alt: 'Product Hunt Wrapped 2025 Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Hunt Wrapped 2025',
    description:
      'My year as a maker, visualized. Generate your PH Wrapped now.',
    creator: '@alexcloudstar', // Replace with your actual X handle
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
