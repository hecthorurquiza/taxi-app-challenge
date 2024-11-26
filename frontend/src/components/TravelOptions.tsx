import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRideConfirm, IDriver } from '../hooks/useRide';

const TravelOptions: React.FC = () => {
  const location = useLocation();
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const { data, customerId, origin, destination } = location.state;  
  const { confirmRide, loading } = useRideConfirm();
  
  const pointALat = parseFloat(data.origin.latitude.toString()).toFixed(6);
  const pointALng = parseFloat(data.origin.longitude.toString()).toFixed(6);
  const pointBLat = parseFloat(data.destination.latitude.toString()).toFixed(6);
  const pointBLng = parseFloat(data.destination.longitude.toString()).toFixed(6);
  const drivers: IDriver[] = data.options;

  let completePath = ''

  data.routeResponse.routes[0].legs[0].steps.forEach((route: any) => {
    const lat = parseFloat(route.startLocation.latLng.latitude.toString()).toFixed(6)
    const lng = parseFloat(route.startLocation.latLng.longitude.toString()).toFixed(6)

    completePath += (`|${lat},${lng}`)
  })

  const handleChooseDriver = (driver: IDriver) => {
    confirmRide({ 
      customerId, 
      origin, 
      destination, 
      distance: data.distance,
      duration: data.duration,
      driver,
      value: Number((driver.value * (data.distance / 1000)).toFixed(2))
    });
  }

  return (
    <div>
      <h1 className='text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl mb-14 mt-20'
      >Opções de Viagem</h1>
      
      <div className="mb-10 flex justify-center">
        <img src={`https://maps.googleapis.com/maps/api/staticmap?size=900x400&markers=color:blue|label:A|${pointALat},${pointALng}&&markers=color:blue|label:B|${pointBLat},${pointBLng}&path=color:blue|weight:5${completePath}7&key=${apiKey}`}
        alt="Google map" className='rounded-md' 
        />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Nome
              </th>
              <th scope="col" className="px-4 py-3">
                Descrição
              </th>
              <th scope="col" className="px-4 py-3">
                Veículo
              </th>
              <th scope="col" className="px-4 py-3">
                Avaliação
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Valor da viagem
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} className="border-b bg-gray-200 text-gray-700">
                <td className="px-4 py-4 font-medium whitespace-nowrap">
                  {driver.name}
                </td>
                <td className="px-4 py-4 max-w-xs text-clip">
                  {driver.description}
                </td>
                <td className="px-4 py-4 max-w-40">
                  {driver.vehicle}
                </td>
                <td className="px-4 py-4 max-w-60 text-clip">
                  {`${driver.review.rating} - ${driver.review.comment}`}
                </td>
                <td className="px-4 py-4 text-center">
                  {`R$${(driver.value * (data.distance / 1000)).toFixed(2)}`}
                </td>
                <td className="px-4 py-4 text-center">
                  <button onClick={() => handleChooseDriver(driver)} disabled={loading} 
                  className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >{loading ? "Confirmando..." : "Escolher"}</button>
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