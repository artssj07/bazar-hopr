import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import Link from 'next/link';
import TermsWrapper from '@/components/TermsWrapper';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

export const metadata = {
  title: 'Bazar de Equipamentos - HOPR',
  description: 'Bazar interno do Hospital de Olhos do Paraná',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  
    <html lang="pt-br" className="flex flex-col min-h-screen">
      <body
        className={`${lato.className} bg-white text-black flex flex-col flex-grow`}
      >
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

          </div>
        </header>

        {/* O TermsWrapper*/}
        <TermsWrapper>
          <main className="w-full flex-grow">{children}</main>
        </TermsWrapper>

        {/* --- RODAPÉ --- */}
        <footer className="w-full bg-gray-200 p-4 mt-auto">
          <div className="container mx-auto text-center">
            <p className="text-xs text-gray-600">
              Atenção: Para acessar este sistema necessitará uma autorização
              prévia, sendo estritamente limitado ao uso especificado na
              autorização. Acesso não autorizado ou uso indevido do mesmo é
              estritamente proibida e constitui uma violação da segurança da
              informação do HOSPITAL DE OLHOS DO PARANÁ/INSTITUTO PROFESSOR
              MOREIRA. A utilização deste sistema pode ser monitorada.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}