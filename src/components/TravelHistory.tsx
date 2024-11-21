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
      <h1>Histórico de Viagens</h1>
      <input type="text" placeholder="ID do Usuário" value={userId} onChange={e => setUserId(e.target.value)} />
      <select value={driver} onChange={e => setDriver(e.target.value)}>
        <option value="all">Todos</option>
        <option value="1">Motorista 1</option>
        <option value="2">Motorista 2</option>
      </select>
      <button type="button" onClick={handleFilter}>Aplicar Filtro</button>
      <ul>
        {mockTrips.map((trip, index) => (
          <li key={index}>
            <p>Data e Hora: {trip.date}</p>
            <p>Motorista: {trip.driver}</p>
            <p>Origem: {trip.origin}</p>
            <p>Destino: {trip.destination}</p>
            <p>Distância: {trip.distance}</p>
            <p>Tempo: {trip.time}</p>
            <p>Valor: {trip.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravelHistory;