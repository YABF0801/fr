import { useQuery } from '@tanstack/react-query'
import { getOtherChildrenInCi } from '../services'

export const useOtherChildrenInCi = () => {

  const queryOtherChildrenInCi = useQuery({
    queryKey: ['OtherChildrenInCi'],
    queryFn: getOtherChildrenInCi
  })

  return queryOtherChildrenInCi
}