import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TravelOptions: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || { data: {} };
  // Dados fictícios para exibição
  const drivers = [
    { name: 'Motorista 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ornare augue magna, fermentum aliquet nisl consectetur vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla ut nisl dui. Fusce eu metus erat. Aenean eget mauris at quam ultricies tristique ac eu lectus.', vehicle: 'Veículo 1', rating: 4.5, price: 50 },
    { name: 'Motorista 2', description: 'Descrição 2', vehicle: 'Veículo 2', rating: 4.8, price: 60 },
  ];

  const handleChooseDriver = async (driverId: number) => {
    navigate('/historico');
    // try {
    //   const response = await fetch('/api/confirm', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ driverId })
    //   });
    //   // Redirecionar para a tela de histórico de viagens com os dados recebidos
    //   history.push('/historico');
    // } catch (error) {
    //   console.error('Erro ao confirmar viagem:', error);
    //   // Exibir mensagem de erro para o usuário
    // }
  };

  return (
    <div>
      <h1 className='text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl mb-14 mt-20'
      >Opções de Viagem</h1>
      
      <div className='mb-10' id="map">Mapa estático com a rota</div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-11 py-3">
                Descrição
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Veículo
              </th>
              <th scope="col" className="px-2 py-3 text-center">
                Avaliação
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Valor da Viagem
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={index} className="border-b bg-gray-200 text-gray-700">
                <td className="px-6 py-4 font-medium whitespace-nowrap">
                  {driver.name}
                </td>
                <td className="px-11 py-4 max-w-xs text-clip">
                  {driver.description}
                </td>
                <td className="px-6 py-4 text-center">
                  {driver.vehicle}
                </td>
                <td className="px-2 py-4 text-center">
                  {driver.rating}
                </td>
                <td className="px-3 py-4 text-center">
                  {driver.price}
                </td>
                <td className="px-3 py-4 text-center">
                  <button onClick={() => handleChooseDriver(index)} 
                  className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >Escolher</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TravelOptions;