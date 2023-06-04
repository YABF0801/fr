import { useState, useEffect } from 'react';
import { baseAxios } from '../../api/baseAxios';

export function useFetch(url) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		async function fetchData() {
			setIsLoading(true);
			try {
				const totalBoysGirls = await baseAxios.get(url);
				setData(totalBoysGirls.data);
			} catch (error) {
				console.log(error);
				setError(error);
			} finally {
				setIsLoading(false);
			}
		}
	
		fetchData();
	}, []);

	return { data, isLoading, error };
}
