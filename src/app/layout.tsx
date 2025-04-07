import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Derick Fiebiger | Design Engineer",
  description: "Portfolio of Derick Fiebiger, a Design Engineer focused on building clean, intuitive dashboards and real-time tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased text-gray-5">
        {children}
      </body>
    </html>
  );
}
