import { useQuery } from '@tanstack/react-query'
import { getStatusCount } from '../services'

export const useStatusCount = () => {

  const queryStatusCount = useQuery({
    queryKey: ['StatusCount'],
    queryFn: getStatusCount
  })

  return queryStatusCount
}