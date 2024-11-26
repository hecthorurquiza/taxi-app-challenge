import React, { useState } from 'react';
import { useRideHistory, IRides } from '../hooks/useRide';
import { useNavigate } from 'react-router-dom';

const TravelHistory: React.FC = () => {
  const [customerId, setCustomerId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [trips, setTrips] = useState<IRides[]>([]);
  const { filterRides, loading } = useRideHistory();
  const navigate = useNavigate();

  const handleFilter = async () => {
    setTrips(await filterRides(customerId, Number(driverId)));
  }
  
  return (
    <div>
      <h1 className='text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl mb-14 mt-20'
      >Histórico de Viagens</h1>

      <div className='flex justify-center' >
        <div className='w-80 px-3'>
          <input className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 
          mb-3 leading-tight focus:outline-none focus:bg-white' 
          type="text" placeholder="ID do Usuário" value={customerId} onChange={e => setCustomerId(e.target.value)} />  
        </div>
        <div className='w-80 px-3'>
          <select className='block w-full bg-gray-200 text-gray-700 border rounded focus:bg-white py-3 px-4' 
          value={driverId} onChange={e => setDriverId(e.target.value)}>
            <option>Todos</option>
            <option value="1">Homer Simpson</option>
            <option value="2">Dominic Toretto</option>
            <option value="3">James Bond</option>
          </select>
        </div>
        <div className='px-3'>
          <button className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-3 px-4 text-center mb-3'  
          type="button" onClick={handleFilter} disabled={loading} 
          >{ loading ? "Filtrando" : "Aplicar filtro"}</button>
        </div>
        <div className='px-3'>
          <button className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-3 px-4 text-center mb-3'  
          type="button" onClick={() => navigate("/solicitacao")} disabled={loading} 
          >Nova viagem</button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Data e Hora
              </th>
              <th scope="col" className="px-4 py-3">
                Motorista
              </th>
              <th scope="col" className="px-4 py-3">
                Origem
              </th>
              <th scope="col" className="px-4 py-3">
                Destino
              </th>
              <th scope="col" className="px-4 py-3">
                Distância
              </th>
              <th scope="col" className="px-4 py-3">
                Tempo
              </th>
              <th scope="col" className="px-4 py-3">
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            {trips?.map((trip) => (
              <tr key={trip.id} className="border-b bg-gray-200 text-gray-700">
                <td className="px-4 py-4 max-w-xs">
                  {`${trip.date.split('T')[0]} ${trip.date.split('T')[1].split('.')[0]}`}
                </td>
                <td className="px-4 py-4">
                  {trip.driver.name}
                </td>
                <td className="px-4 py-4 max-w-64">
                  {trip.origin}
                </td>
                <td className="px-4 py-4 max-w-64">
                  {trip.destination}
                </td>
                <td className="px-4 py-4">
                  {`${(trip.distance / 1000).toFixed(2)} km`}
                </td>
                <td className="px-4 py-4">
                  {`${(Number(trip.duration.split('s')[0]) / 60).toFixed(0)} min`}
                </td>
                <td className="px-4 py-4">
                  {`R$ ${trip.value}`}
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