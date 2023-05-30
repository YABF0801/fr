import { useQuery } from '@tanstack/react-query'
import {getCapacityCperYear} from '../services/getCapacityCalculatedPerYear'

export const useCapacityCalculatedPerYear = () => {

  const queryCapacityCalculatedPerYear = useQuery({
    queryKey: ['capictyCalculatedPerYear'],
    queryFn: getCapacityCperYear
  })


  return queryCapacityCalculatedPerYear

}