import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import Link from 'next/link';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'HOPR STORE - Bazar',
  description: 'Bazar interno do Hospital de Olhos do Paraná',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${lato.className} bg-white text-black`}>
        <header className="w-full bg-green-700 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center gap-4 cursor-pointer">
                <Image
                  src="/logo-hopr.png"
                  alt="Logo Hospital de Olhos do Paraná - Voltar ao Início"
                  width={150}
                  height={40}
                  priority
                />
              </div>
            </Link>

            <span className="text-lg">HOPR STORE</span>
          </div>
        </header>

        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  );
}