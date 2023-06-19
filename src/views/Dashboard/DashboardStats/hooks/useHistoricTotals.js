import { useQuery } from "@tanstack/react-query";
import { getHistoricCirculos } from "../services/getHistoricTotalsCirculos";

const useHistoricTotals = () => {

  const queryHistoricTotals = useQuery({
    queryKey: ['historicTotals'],
    queryFn: getHistoricCirculos,
  })

   return { queryHistoricTotals }

}

export default useHistoricTotals;