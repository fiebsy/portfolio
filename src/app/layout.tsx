import type { Metadata } from 'next';
import { JetBrains_Mono, Manrope } from 'next/font/google';
import './globals.css';

// Configure fonts with Next.js optimization
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Derick Fiebiger | Design Engineer',
  description:
    'Portfolio of Derick Fiebiger, a Design Engineer focused on building clean, intuitive dashboards and real-time tools.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-gray-3 min-h-screen relative">
        {/* SVG Background Patterns */}
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
          {/* Diagonal Line Pattern */}
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.03 }}
          >
            <defs>
              <pattern
                id="diagonal-line-pattern"
                width="4"
                height="4"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="4" stroke="#000000" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonal-line-pattern)" />
          </svg>

          {/* Grid Line Pattern */}
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.03 }}
          >
            <defs>
              <pattern id="grid-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
                {/* Horizontal line */}
                <path d="M 0 0 L 16 0" fill="none" stroke="#000000" strokeWidth="0.75" />
                {/* Vertical line */}
                <path d="M 0 0 L 0 16" fill="none" stroke="#000000" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative ">{children}</div>
      </body>
    </html>
  );
}
