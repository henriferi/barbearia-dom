'use client'

import { Agendamento } from '@prisma/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ButtonAgendar from '../components/ButtonAgendar';

const ListaAgendamentos = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [senha, setSenha] = useState<string>('');
  const [senhaErro, setSenhaErro] = useState<string>('');

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await fetch('/api/agendamentos');
        if (response.ok) {
          const data = await response.json();
          setAgendamentos(data);
        } else {
          alert('Erro ao carregar os agendamentos');
        }
      } catch (error) {
        console.error('Erro ao carregar os agendamentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, []);


  if (loading) {
    return <div>Carregando agendamentos...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">Agendamentos</h1>

      {/* Botão de Fazer Agendamento */}
      <div className="text-center mb-6">
        <Link href="/agendamento">
          <ButtonAgendar label='Fazer Agendamento' />
        </Link>
      </div>

      <div className="space-y-4">
        {agendamentos.length === 0 ? (
          <p className="text-center text-gray-500">Não há agendamentos para este dia até o momento...</p>
        ) : (
          agendamentos.map((agendamento: Agendamento) => (
            <div key={agendamento.id} className="p-4 border border-gray-300 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">{agendamento.nomeCliente}</h3>
              <p className="text-sm text-gray-600">{agendamento.telefone}</p>
              <p className="text-sm text-gray-500">Serviço: {agendamento.servico}</p>

              {/* Separando a data e a hora */}
              <div className="text-sm text-gray-400">
                <p>Data: {new Date(agendamento.data).toLocaleDateString('pt-BR')}</p>
                <p>
                  Hora: {new Date(agendamento.data).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListaAgendamentos;
