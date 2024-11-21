import React, { useState } from 'react';

const TravelHistory: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [driver, setDriver] = useState('Todos');
  const [trips, setTrips] = useState([]);

  const mockTrips = [
    {
      date: '2023-10-01 10:00',
      driver: 'Motorista 1',
      origin: 'Local A',
      destination: 'Local B',
      distance: '10 km',
      time: '15 min',
      price: 'R$ 20,00'
    },
    {
      date: '2023-10-02 12:00',
      driver: 'Motorista 2',
      origin: 'Local C',
      destination: 'Local D',
      distance: '5 km',
      time: '10 min',
      price: 'R$ 10,00'
    }
  ];

  const handleFilter = async () => {
    console.log(`userId: ${userId}, driver: ${driver}`);
    // try {
    //   const response = await fetch(`/api/history?userId=${userId}&driver=${driver}`);
    //   const data = await response.json();
    //   setTrips(data.trips);
    // } catch (error) {
    //   console.error('Erro ao buscar histórico de viagens:', error);
    //   // Exibir mensagem de erro para o usuário
    // }
  };

  return (
    <div>
      <h1 className='text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl mb-14 mt-20'
      >Histórico de Viagens</h1>

      <div className='flex justify-center' >
        <div className='w-80 px-3'>
          <input className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 
          mb-3 leading-tight focus:outline-none focus:bg-white' 
          type="text" placeholder="ID do Usuário" value={userId} onChange={e => setUserId(e.target.value)} />  
        </div>
        <div className='w-80 px-3'>
          <select className='block w-full bg-gray-200 text-gray-700 border rounded focus:bg-white py-3 px-4' 
          value={driver} onChange={e => setDriver(e.target.value)}>
            <option value="all">Todos</option>
            <option value="1">Motorista 1</option>
            <option value="2">Motorista 2</option>
          </select>
        </div>
        <div className='px-3'>
          <button className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-3 px-4 text-center mb-3'  
          type="button" onClick={handleFilter}>Aplicar Filtro</button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3 text-center">
                Data e Hora
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Motorista
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Origem
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Destino
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Distância
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Tempo
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            {mockTrips.map((trip, index) => (
              <tr key={index} className="border-b bg-gray-200 text-gray-700">
                <td className="px-3 py-4 text-center">
                  {trip.date}
                </td>
                <td className="px-3 py-4 text-center">
                  {trip.driver}
                </td>
                <td className="px-3 py-4 text-center">
                  {trip.origin}
                </td>
                <td className="px-3 py-4 text-center">
                  {trip.destination}
                </td>
                <td className="px-3 py-4 text-center">
                  {trip.distance}
                </td>
                <td className="px-3 py-4 text-center">
                  {trip.time}
                </td>
                <td className="px-3 py-4 text-center">
                  {trip.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TravelHistory;