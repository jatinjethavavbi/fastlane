import type { Metadata } from 'next';
import { Bricolage_Grotesque, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Velox — Creative Intelligence & Ad Diversity Platform',
  description:
    'Turn any product URL into researched, multi-format ad creative batches built to outpace creative fatigue across Meta, TikTok, and YouTube Shorts.',
  openGraph: {
    title: 'Velox — Creative Intelligence & Ad Diversity Platform',
    description:
      'Turn any product URL into researched, multi-format ad creative batches built to outpace creative fatigue across Meta, TikTok, and YouTube Shorts.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jetbrains.variable} ${jakarta.variable}`}
    >
      <body className="bg-[#FAFAFA] text-[#111216] antialiased selection:bg-[#2563EB] selection:text-white">
        {children}
      </body>
    </html>
  );
}

