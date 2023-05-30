import { useQuery } from '@tanstack/react-query'
import { getMatriculaPorCp } from '../services'


export const useMatriculaPorCpopular = () => {

  const queryMatriculaPorCpopular = useQuery({
    queryKey: 'MatriculaPorCpopular',
    queryFn: getMatriculaPorCp
  })

  return queryMatriculaPorCpopular
}
