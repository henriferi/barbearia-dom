'use client'

import { useState } from 'react';
import Link from 'next/link';
import ButtonAgendar from '../components/ButtonAgendar';
import ButtonConsultar from '../components/ButtonConsultar';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';



const AgendamentoPage = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState<string>('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [servico, setServico] = useState('');

  const [modalMessage, setModalMessage] = useState(''); // Estado para a mensagem do modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal


  const handleChange = (value?: string) => {  // O valor será string, já que PhoneInput pode retornar string
    setTelefone(value ?? '');  // Converte undefined para string vazia
  };

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
        setModalMessage('Agendamento realizado com sucesso!'); // Define a mensagem de sucesso
        setIsModalOpen(true); // Abre o modal
        clearForm(); // Limpa o formulário
      } else {
        setModalMessage('Erro ao agendar. Tente novamente.');
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Erro ao agendar:', error);
      setModalMessage('Erro ao agendar. Tente novamente.');
      setIsModalOpen(true);
    }
  };

  // Função para limpar o formulário
  const clearForm = () => {
    setNome('');
    setTelefone('');
    setData('');
    setHora('');
    setServico('');
  };

  return (
    <div className="max-w-xl mx-auto p-6">
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
          <label htmlFor="telefone">Telefone</label>
          <PhoneInput
            id="telefone"
            value={telefone}
            onChange={handleChange}
            defaultCountry="BR"
            international
            required
            className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          />
          <br />
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p>{modalMessage}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendamentoPage;
