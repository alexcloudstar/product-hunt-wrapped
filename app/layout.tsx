import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';

const soraFont = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  weight: ['400', '700'],
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
        url: '/og-image.jpg',
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
    creator: '@alexcloudstar',
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
      <body className={`${soraFont.variable} ${soraFont.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
