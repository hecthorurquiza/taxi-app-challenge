import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/apiServices"
import toast from "react-hot-toast"

interface IRideEstimate {
  customerId: string;
  origin: string;
  destination: string;
}

export interface IDriver {
  id: number
  name: string
  description: string
  vehicle: string
  review: {
    rating: string
    comment: string
  }
  value: number
}

interface IRideConfirm {
  customerId: string;
  origin: string;
  destination: string;
  distance: number;
  duration: number;
  driver: IDriver
  value: number;
}

export interface IRides {
  id: number
  date: string
  origin: string
  destination: string
  distance: number
  duration: string
  driver: {
    id: number
    name: string
  }
  value: number
}

const useRideEstimate = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const estimateRide = useCallback(
    async (props: IRideEstimate) => {
      setLoading(true);
      try {
        const response = await toast.promise(api.post('/ride/estimate', { 
          customer_id: props.customerId, 
          origin: props.origin, 
          destination: props.destination 
        }), {
          loading: 'Estimando viagem...',
          success: 'Viagem estimada com sucesso!',
          error: 'Erro ao estimar viagem!'
        });

        navigate('/opcoes', { state: { 
          data: response.data, 
          customerId: props.customerId, 
          origin: props.origin, 
          destination: props.destination 
        } });
      } 
      catch (error: any) {
        console.log('Erro ao estimar viagem:', error.response.data.error_description);
        toast.error(error.response.data.error_description);
      }
      finally {
        setLoading(false)
      }
    }, [navigate]
  );

  return {
    estimateRide,
    loading,
  };
}

const useRideConfirm = () => {
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  const confirmRide = useCallback(
    async (data: IRideConfirm) => {
      setLoading(true);
      try {
        await toast.promise(api.patch('/ride/confirm', { 
          customer_id: data.customerId,
          origin: data.origin,
          destination: data.destination,
          distance: data.distance,
          duration: data.duration,
          driver: {
            id: data.driver.id,
            name: data.driver.name
          },
          value: data.value
        }), {
          loading: 'Confirmando viagem...',
          success: 'Viagem confirmada com sucesso!',
          error: 'Erro ao confirmar viagem!'
        });

        navigate('/historico');
      } 
      catch (error: any) {
        console.error('Erro ao confirmar viagem:', error);
        toast.error(error.response.data.error_description);
      }
    }, [navigate]
  );

  return {
    confirmRide,
    loading
  };
}

const useRideHistory = () => {
  const [loading, setLoading] = useState(false);

  const filterRides = useCallback(
    async (customerId: string, driverId: number) => {
      if (!customerId) {
        toast.error('Informe um ID de usuário válido!');
        return;
      }

      setLoading(true);
      try {
        const response = await toast.promise(api.get(`/ride/${customerId}`, {
          params: {
            driver_id: driverId !== 0 ? driverId : null,
          }
        }), {
          loading: 'Buscando histórico de viagens...',
          success: 'Histórico de viagens encontrado!',
          error: 'Erro ao buscar histórico de viagens!'
        });

        return response.data.rides;
      } 
      catch (error: any) {
        console.error('Erro ao buscar histórico de viagens:', error);
        toast.error(error.response.data.error_description);
      }
      finally {
        setLoading(false);
      }
    }, []
  );

  return {
    filterRides,
    loading
  };
}

export { useRideEstimate, useRideConfirm, useRideHistory }