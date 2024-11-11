import Link from "next/link";
import ButtonAgendar from "./components/ButtonAgendar";
import ButtonConsultar from "./components/ButtonConsultar";


export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <div className="my-8">
        {/* Título e Saudação */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Bem-vindo</h2>
          <p className="text-lg text-gray-600 mt-4">
            A melhor barbearia da cidade, pronta para cuidar de você e do seu visual.
          </p>
        </div>

        {/* Horário de Funcionamento */}
        <div className="text-center mt-8">
          <h3 className="text-2xl font-semibold text-gray-800">Horário de Funcionamento</h3>
          <p className="text-lg text-gray-600 mt-4">
            <strong>Segunda a Sexta:</strong> 08:30 às 20:00
          </p>
          <p className="text-lg text-gray-600 mt-2">
            <strong>Sábado:</strong> 08:00 às 15:00
          </p>
          <p className="text-lg text-gray-600 mt-2">
            <strong>Domingo:</strong> 08:00 às 12:00
          </p>
        </div>



        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row text-center justify-center gap-6 m-6">
            <Link href="/agendamento" passHref>
              <ButtonAgendar label="Fazer Agendamento" />
            </Link>

            <Link href="/listaAgendamentos" passHref>
              <ButtonConsultar label="Consultar Agendamentos" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
