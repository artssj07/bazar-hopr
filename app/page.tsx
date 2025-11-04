import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 0;

interface Produto {
  id: number;
  nome: string;
  preco: number;
  url_foto_principal: string;
  categoria: string;
  estoque: number;
}

async function getProdutos(
  categoriaFiltro?: string
): Promise<Produto[]> {
  let query = supabase
    .from('produtos')
    .select('id, nome, preco, url_foto_principal, categoria, estoque');

  if (categoriaFiltro) {
    query = query.eq('categoria', categoriaFiltro);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
  return data as Produto[];
}

export default async function HomePage(props: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria: categoriaFiltro } = await props.searchParams;
  const produtos = await getProdutos(categoriaFiltro);

  return (
    <div className="container mx-auto p-4">
      {/* --- ESTE É O CABEÇALHO QUE FICA SEMPRE VISÍVEL --- */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          HOPR STORE - BAZAR INTERNO
        </h1>
      </header>

      {!categoriaFiltro ? (
        <div className="flex flex-col items-center justify-center py-10">
          
          {/* --- IMAGEM DO CARTOON --- */}
          <Image
            src="/desktop_bazar2.png"
            alt="Ilustração de um computador"
            width={180}
            height={180}
            priority
          />
      

          <h2 className="text-2xl font-bold text-center text-gray-800 mt-6">
            O que você deseja adquirir?
          </h2>
          <p className="text-center text-gray-600 mt-2 mb-8">
            Selecione uma categoria para ver os itens.
          </p>

          <div className="w-full max-w-md space-y-4">
            <Link
              href="/?categoria=Notebooks"
              className="block w-full text-center bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg hover:bg-blue-700 transition-colors"
            >
              Notebooks
            </Link>

            <Link
              href="/?categoria=Computadores/CPUs"
              className="block w-full text-center bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg hover:bg-green-800 transition-colors"
            >
              Computadores/CPUs
            </Link>
          </div>
        </div>
      ) : (
       
        <>
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Mostrando: {categoriaFiltro}
              </h1>
              <p className="text-gray-600">
                Equipamentos disponíveis abaixo:
              </p>
            </div>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← Voltar para seleção
            </Link>
          </header>

          <main>
            {produtos.length === 0 && (
              <p className="text-center text-xl text-gray-500">
                Nenhum produto cadastrado no momento.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {produtos.map((produto) => {
                const esgotado = produto.estoque <= 0;

                return (
                  <div
                    key={produto.id}
                    className={`relative card border border-gray-200 rounded-lg shadow-md overflow-hidden ${
                      esgotado ? 'opacity-80' : ''
                    }`}
                  >
                    <Link
                      href={esgotado ? '#' : `/produto/${produto.id}`}
                      className={esgotado ? 'pointer-events-none' : ''}
                    >
                      <div className="relative h-56 w-full">
                        <Image
                          src={produto.url_foto_principal}
                          alt={`Foto do ${produto.nome}`}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />

                        {esgotado && (
                          <>
                          {/* ESCURECIMENTO IMAGEM */}
                            <div className="absolute inset-0 bg-gray bg-opacity-30 backdrop-blur-[3px]"></div>

                            {/* CARD ESGOTADO */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white font-bold px-4 py-2 rounded-lg shadow-lg text-center">
                              ESGOTADO
                            </div>
                          </>
                        )}
                      </div>

                      <div className="p-4 bg-white">
                        <span className="text-sm text-blue-600 font-semibold">
                          {produto.categoria}
                        </span>
                        <h2 className="text-xl font-bold text-gray-800 truncate mt-1">
                          {produto.nome}
                        </h2>
                        <p className="text-gray-700 mt-2">
                          R$ {produto.preco ? produto.preco.toFixed(2) : '0,00'}
                        </p>

                        {!esgotado && (
                          <div className="block w-full text-center bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-green-800 transition-colors">
                            Ver Detalhes / Reservar
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </main>
        </>
      )}
    </div>
  );
}