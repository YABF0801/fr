import { useQuery } from '@tanstack/react-query'
import {
  getCapacityCalculatedPerYear
} from '../services'


export const useCapacityCalculatedPerYear = () => {

  const queryCapacityCalculatedPerYear = useQuery({
    queryKey: 'capictyCalculatedPerYear',
    queryFn: getCapacityCalculatedPerYear
  })


  return queryCapacityCalculatedPerYear

}