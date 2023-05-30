import { useQuery } from '@tanstack/react-query'
import { getTotalBoysPerYear, getTotalGirlsPerYear } from '../services'

export const useTotalChildrenPerYear = () => {

  const queryTotalBoysPerYear = useQuery({
    queryKey: ['TotalBoysPerYear'],
    queryFn: getTotalBoysPerYear
  })

  const queryTotalGirlsPerYear = useQuery({
    queryKey: ['TotalGirlsPerYear'],
    queryFn: getTotalGirlsPerYear
  })

  return {queryTotalBoysPerYear , queryTotalGirlsPerYear}
}