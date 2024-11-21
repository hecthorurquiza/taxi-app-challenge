import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TravelRequest: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handleEstimate = async () => {
    navigate('/opcoes', { state: { data: { userId, origin, destination } } });
    // try {
    //   const response = await fetch('/api/estimate', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ userId, origin, destination })
    //   });
    //   const data = await response.json();
    //   // Redirecionar para a tela de opções de viagem com os dados recebidos
    //   navigate('/opcoes', { state: { data } });
    // } catch (error) {
    //   console.error('Erro ao estimar viagem:', error);
    //   // Exibir mensagem de erro para o usuário
    // }
  };

  return (
    <div>
      <h1>Solicitação de Viagem</h1>
      <form>
        <input type="text" placeholder="ID do Usuário" value={userId} onChange={e => setUserId(e.target.value)} />
        <input type="text" placeholder="Origem" value={origin} onChange={e => setOrigin(e.target.value)} />
        <input type="text" placeholder="Destino" value={destination} onChange={e => setDestination(e.target.value)} />
        <button type="button" onClick={handleEstimate}>Estimar Valor</button>
      </form>
    </div>
  );
};

export default TravelRequest;