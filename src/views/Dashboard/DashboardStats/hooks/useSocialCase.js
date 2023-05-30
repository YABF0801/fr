import { useQuery } from '@tanstack/react-query'
import { getSocialCase } from '../services'

export const useSocialCase = () => {

  const querySocialCase = useQuery({
    queryKey: 'SocialCase',
    queryFn: getSocialCase
  })

  return querySocialCase
}