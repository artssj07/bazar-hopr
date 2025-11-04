export const revalidate = 0;
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';

interface Produto {
  id: number;
  nome: string;
  preço: number;
  url_foto_principal: string;
  categoria: string;
}

async function getProdutos() {
  const { data, error } = await supabase
    .from('produtos')
    .select('id, nome, preço, url_foto_principal, categoria');

  if (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
  return data as Produto[];
}

export default async function HomePage() {
  const produtos = await getProdutos();
  console.log("DADOS VINDOS DO SUPABASE:",produtos);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          HOPR STORE - BAZAR INTERNO
        </h1>
        <p className="text-center text-gray-600">
          Equipamentos disponíveis abaixo:
        </p>
      </header>

      <main>
        {produtos.length === 0 && (
          <p className="text-center text-xl text-gray-500">
            Nenhum produto cadastrado no momento.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="card border border-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              <Link href={`/produto/${produto.id}`}>
                <div className="relative h-56 w-full">
                  <Image
                    src={produto.url_foto_principal}
                    alt={`Foto do ${produto.nome}`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>
              <div className="p-4">
                <span className="text-sm text-blue-600 font-semibold">
                  {produto.categoria}
                </span>
                <h2 className="text-xl font-bold text-gray-800 truncate mt-1">
                  {produto.nome}
                </h2>
                <p className="text-gray-700 mt-2">
                  R$ {produto.preço ? produto.preço.toFixed(2) : '0,00'}
                </p>
                <Link
                  href={`/produto/${produto.id}`}
                  className="block w-full text-center bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-green-800 transition-colors"
                >
                  Ver Detalhes / Reservar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}