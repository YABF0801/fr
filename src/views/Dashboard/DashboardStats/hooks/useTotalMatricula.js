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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await getCapacityAndMatricula();
  //     setTotalCapacidad(result.NormedCapacity);
  //     setTotalMatricula(result.Matricula);
  //   };
  //   fetchData();
  // }, []);

  // const { data: childrens, isLoading: isLoadingChildren } = useFetch(ESTADISTICAS_CHILDREN);

  // useEffect(() => {
  // 	const fetchData = async () => {
  // 		try {
  // 			setTotalBoys(childrens.totalBoys);
  // 			setTotalGirls(childrens.totalGirls);
  // 		} catch (error) {
  // 			console.log(error);
  // 		}
  // 	};
  // 	fetchData();
  // }, []);

  return { queryCapacityAndMatricula, queryTotalBoysAndGirls }

}

export default useTotalMatricula;