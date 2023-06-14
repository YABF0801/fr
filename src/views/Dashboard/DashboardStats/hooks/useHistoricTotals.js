import { useQuery } from "@tanstack/react-query";
import { getHistoricCirculos } from "../services/getHistoricTotalsCirculos";

const useHistoricTotals = () => {

  const queryHistoricTotals = useQuery({
    queryKey: ['historicTotals'],
    queryFn: getHistoricCirculos,
  })

  console.log('hook', queryHistoricTotals.data)
   return { queryHistoricTotals }

}

export default useHistoricTotals;