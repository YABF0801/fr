import { useQuery } from '@tanstack/react-query'
import { getTotalBoysPerYear, getTotalGirlsPerYear } from '../services'

export const useTotalChildrenPerYear = () => {

  const queryTotalBoysPerYear = useQuery({
    queryKey: 'TotalBoysPerYear',
    queryFn: getTotalBoysPerYear
  })

  const queryotalGirlsPerYear = useQuery({
    queryKey: 'otalGirlsPerYear',
    queryFn: getTotalGirlsPerYear
  })

  return {queryTotalBoysPerYear , queryotalGirlsPerYear}
}