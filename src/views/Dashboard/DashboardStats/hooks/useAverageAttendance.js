import { useQuery } from '@tanstack/react-query'
import { getAverageAttendance } from '../services'

export const useAverageAttendance = () => {

  const queryAverageAttendance = useQuery({
    queryKey: ['AverageAttendance'],
    queryFn: getAverageAttendance
  })

  return queryAverageAttendance
}