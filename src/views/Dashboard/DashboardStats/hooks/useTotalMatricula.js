import { useQuery } from "@tanstack/react-query";
import { getCapacityAndMatricula, getTotalGirlsAndBoys } from "../services";

const useTotalMatricula = () => {

  const queryCapacityAndMatricula = useQuery({
    queryKey: ['capacityadnMatricula'],
    queryFn: getCapacityAndMatricula,
  })

  const queryTotalBoysAndGirls = useQuery({
    queryKey: ['totalBoysAndGirls'],
    queryFn: getTotalGirlsAndBoys,
  })

   return { queryCapacityAndMatricula, queryTotalBoysAndGirls }

}

export default useTotalMatricula;