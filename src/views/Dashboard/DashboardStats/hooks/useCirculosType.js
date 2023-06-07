import { useQuery } from '@tanstack/react-query'
import { getCirculosType } from '../services'

export const useCirculosType = () => {

  const queryCirculosType = useQuery({
    queryKey: ['CirculosType'],
    queryFn: getCirculosType
  })

  return { queryCirculosType }
}