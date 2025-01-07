import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import Footer from "@/components/layout/footer";

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-fd-background text-fd-foreground">
        <RootProvider>
          <main className="flex-grow">{children}</main>
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
}
