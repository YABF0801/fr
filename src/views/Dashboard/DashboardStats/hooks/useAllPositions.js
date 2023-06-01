import { useQuery } from '@tanstack/react-query'
import { getCirculosPosition, getSubmisionsPosition } from '../services'

export const useAllPositions = () => {

  const queryCirculosPosition = useQuery({
    queryKey: ['CirculosPosition'],
    queryFn: getCirculosPosition
  })

  
  const querySubmisionsPosition = useQuery({
    queryKey: ['SubmisionsPosition'],
    queryFn: getSubmisionsPosition
  })

  return {queryCirculosPosition, querySubmisionsPosition}
}