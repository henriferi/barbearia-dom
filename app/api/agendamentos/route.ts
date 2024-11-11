import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';  // Se estiver subindo duas pastas

// Manipulador GET para buscar agendamentos do dia
export async function GET() {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);  // Zera as horas para pegar o início do dia atual
    const fimDoDia = new Date(hoje);
    fimDoDia.setHours(23, 59, 59, 999);  // Define o fim do dia (23:59:59.999)

    // Buscar os agendamentos do dia
    const agendamentos = await prisma.agendamento.findMany({
      where: {
        data: {
          gte: hoje,  // Maior ou igual à data de hoje
          lte: fimDoDia, // Menor ou igual ao fim do dia
        },
      },
      orderBy: {
        data: 'asc', // Ordena pelo horário do agendamento
      },
    });

    return NextResponse.json(agendamentos);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return NextResponse.json({ error: 'Erro ao buscar agendamentos' }, { status: 500 });
  }
}

// Manipulador POST para criar um novo agendamento
export async function POST(request: Request) {
  try {
    const { nome, telefone, data, servico } = await request.json();

    // Validar os dados do agendamento
    if (!nome || !telefone || !data || !servico) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    // Criar o agendamento no banco de dados
    const novoAgendamento = await prisma.agendamento.create({
      data: {
        nomeCliente: nome,
        telefone,
        data: new Date(data),  // Converter a data recebida para o formato Date
        servico,
      },
    });

    return NextResponse.json(novoAgendamento, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    return NextResponse.json({ error: 'Erro ao criar o agendamento' }, { status: 500 });
  }
}

