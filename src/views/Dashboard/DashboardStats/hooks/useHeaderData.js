import { useQuery } from '@tanstack/react-query'
import { FechaOmApiGet } from '../../../../utils/utiles.sevices'
import { cursoApiGet } from '../../Circulos/service/circulo.services'

export const useHeaderData = () => {

  const queryCurso = useQuery({
    queryKey: ['Curso'],
    queryFn: cursoApiGet
  })

  
  const queryFechaOm = useQuery({
    queryKey: ['SubmisionsPosition'],
    queryFn: FechaOmApiGet
  })

  return {queryCurso, queryFechaOm}
}