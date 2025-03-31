import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { NextAuthProvider } from '@/providers/NextAuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '外壁見積もり窓口 | 無料一括見積もりで最適な外壁塗装',
  description:
    '外壁塗装の一括見積もりサイト。優良業者の中から最適な施工プランを無料でご提案します。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-gray-50">{children}</main>
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
