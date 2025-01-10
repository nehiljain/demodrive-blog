import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { PostHogProvider } from './providers';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import Footer from "@/components/layout/footer";

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} dark`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-fd-background">
        <PostHogProvider>
          <RootProvider
            search={{
              enabled: false,
            }}
            theme={{
              enabled: false,
            }}
          >
            <main className="flex-grow">{children}</main>
            <Footer />
          </RootProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
