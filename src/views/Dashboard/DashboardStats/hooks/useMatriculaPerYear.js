import { useQuery } from '@tanstack/react-query'
import { getMatriculaPerYear } from '../services'

export const useMatriculaPerYear = () => {

  const queryMatriculaPerYear = useQuery({
    queryKey: 'matriculaPerYear',
    queryFn: getMatriculaPerYear
  })

  return queryMatriculaPerYear
}



