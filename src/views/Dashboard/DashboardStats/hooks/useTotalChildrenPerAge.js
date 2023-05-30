import { useQuery } from '@tanstack/react-query'
import { getTotalChildrenPerAge } from '../services'

export const useTotalChildrenPerAge = () => {

  const queryTotalChildrenPerAge = useQuery({
    queryKey: ['TotalChildrenPerAge'],
    queryFn: getTotalChildrenPerAge
  })

  return queryTotalChildrenPerAge
}