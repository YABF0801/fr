import { useQuery } from '@tanstack/react-query'
import { getCapacityNperYear } from '../services'

export const useCapacityNperYear = () => {

  const queryCapacityNperYear = useQuery({
    queryKey: 'capacityNperYear',
    queryFn: getCapacityNperYear
  })

  return queryCapacityNperYear
}