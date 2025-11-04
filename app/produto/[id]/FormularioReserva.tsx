'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface FormularioProps {
  produtoId: number;
}

export default function FormularioReserva({ produtoId }: FormularioProps) {
  const [nome, setNome] = useState('');
  const [setor, setSetor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');
    setErro('');

    const { error } = await supabase.from('pedidos').insert([
      {
        nome_solicitante: nome,
        setor_solicitante: setor,
        id_produto: produtoId,
      },
    ]);

    if (error) {
      console.error('Erro ao criar pedido:', error);
      setErro('Falha ao registrar o pedido. Tente novamente.');
    } else {
      setMensagem(
        'Reserva solicitada com sucesso! O setor de TI entrará em contato.'
      );
      setNome('');
      setSetor('');
    }

    setLoading(false);
  };

  if (mensagem) {
    return (
      <p className="text-center font-bold text-green-600 bg-green-100 p-4 rounded-md">
        {mensagem}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          Seu Nome Completo
        </label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div>
        <label htmlFor="setor" className="block text-sm font-medium text-gray-700">
          Seu Setor / Matrícula
        </label>
        <input
          type="text"
          id="setor"
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full text-center bg-green-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Enviando...' : 'Solicitar Reserva'}
      </button>

      {erro && (
        <p className="text-center font-medium text-red-600">{erro}</p>
      )}
    </form>
  );
}