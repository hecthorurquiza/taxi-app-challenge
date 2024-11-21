import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const TravelOptions: React.FC = () => {
  // const history = useHistory();
  const location = useLocation();
  const { data } = location.state || { data: {} };
  // Dados fictícios para exibição
  const drivers = [
    { name: 'Motorista 1', description: 'Descrição 1', vehicle: 'Veículo 1', rating: 4.5, price: 50 },
    { name: 'Motorista 2', description: 'Descrição 2', vehicle: 'Veículo 2', rating: 4.8, price: 60 },
  ];

  const handleChooseDriver = async (driverId: number) => {
    console.log(data);
    console.log(drivers[driverId]);
  
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
      <h1>Opções de Viagem</h1>
      <div id="map">Mapa estático com a rota</div>
      <ul>
        {drivers.map((driver, index) => (
          <li key={index}>
            <p>{driver.name}</p>
            <p>{driver.description}</p>
            <p>{driver.vehicle}</p>
            <p>Avaliação: {driver.rating}</p>
            <p>Valor: {driver.price}</p>
            <button onClick={() => handleChooseDriver(index)}>Escolher</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravelOptions;