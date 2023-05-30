import { useQuery } from '@tanstack/react-query'
import { getOcupationCount } from '../services'

export const useOcupationCount = () => {

  const queryOcupationCount = useQuery({
    queryKey: 'OcupationCount',
    queryFn: getOcupationCount
  })

  return queryOcupationCount
}