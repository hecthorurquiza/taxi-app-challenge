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
      <h1 className='text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl mb-14 mt-20'
      >Solicitação de Viagem</h1>
      <form className='flex flex-col items-center space-y-8 w-full max-w-lg mx-auto'>
        <div className='flex justify-center' >
          <div className='w-80 px-3'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs text-left font-bold mb-2' 
            htmlFor="userID">ID do usuário:</label>
            <input className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 
            mb-3 leading-tight focus:outline-none focus:bg-white' 
            type="text" placeholder="ID do Usuário" value={userId} onChange={e => setUserId(e.target.value)} />  
          </div>
          <div className='w-80 px-3'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs text-left font-bold mb-2' 
            htmlFor="origin">Origem:</label>
            <input className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' 
            name='origin' type='text' placeholder='Origem' value={origin} onChange={e => setOrigin(e.target.value)} />
          </div>
          <div className='w-80 px-3'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs text-left font-bold mb-2' 
            htmlFor="origin">Destino:</label>
            <input className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' 
            name='destination' type='text' placeholder='Destino' value={destination} onChange={e => setDestination(e.target.value)} />
          </div>
        </div>

        <button className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'  
        type='button' onClick={handleEstimate}>Estimar Valor</button>
      </form>
    </div>
  );
};

export default TravelRequest;