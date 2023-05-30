import { useQuery } from '@tanstack/react-query'
import { getSubmisionAprovedByYear, getSubmisionCountByDate, getSubmisionsByUser } from '../services'

export const useSubmisionTotals = () => {

  const querySubmisionAprovedByYear = useQuery({
    queryKey: 'SubmisionAprovedByYear',
    queryFn: getSubmisionAprovedByYear
  })

  const querySubmisionCountByDate = useQuery({
    queryKey: 'SubmisionCountByDate',
    queryFn: getSubmisionCountByDate
  })

  const querySubmisionsByUser = useQuery({
    queryKey: 'SubmisionsByUser',
    queryFn: getSubmisionsByUser
  })

  return {querySubmisionAprovedByYear, querySubmisionCountByDate, querySubmisionsByUser}
}