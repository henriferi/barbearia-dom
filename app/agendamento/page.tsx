'use client'

import { useState } from 'react';
import Link from 'next/link'; // Importe o Link do Next.js
import ButtonAgendar from '../components/ButtonAgendar';
import ButtonConsultar from '../components/ButtonConsultar';

const AgendamentoPage = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [servico, setServico] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataHora = new Date(`${data}T${hora}:00`); // Formatação de data e hora combinadas

    const agendamento = { nome, telefone, data: dataHora, servico };

    try {
      const response = await fetch('/api/agendamentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agendamento),
      });

      if (response.ok) {
        alert('Agendamento realizado com sucesso!');
      } else {
        alert('Erro ao agendar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao agendar:', error);
      alert('Erro ao agendar. Tente novamente.');
    }
  };


  return (
    <div className="max-w-xl mx-auto p-6 ">
      <h1 className="text-2xl font-semibold text-center mb-6">Agendamento de Serviço</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium">Nome do Cliente</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="telefone" className="block text-sm font-medium">Telefone</label>
          <input
            type="text"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="data" className="block text-sm font-medium">Data do Serviço</label>
          <input
            type="date"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="hora" className="block text-sm font-medium">Hora do Serviço</label>
          <input
            type="time"
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            min="08:00"
            max="20:00"
            step="1800"
          /> <br/>
          <span className='text-sm'>Escolha horários com intervalos de 30 min ex: 08:00 ou 08:30</span>
        </div>

        <div> 
          <label htmlFor="servico" className="block text-sm font-medium">Serviço</label>
          <select
            id="servico"
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecione o Serviço</option>
            <option value="Corte de Cabelo">Corte de Cabelo</option>
            <option value="Barba">Barba</option>
            <option value="Corte e Barba">Corte e Barba</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row text-center justify-center gap-6 m-6">
              <ButtonAgendar label="Fazer Agendamento" />
            <Link href="/listaAgendamentos" passHref>
              <ButtonConsultar label="Consultar Agendamentos" />
            </Link>
          </div>
        </div>

      </form>

    </div>
  );
};

export default AgendamentoPage;
