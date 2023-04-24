import { useState, useEffect } from 'react';

export function useFetch(url) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [controller, setController] = useState(null);

	useEffect(() => {
		const abortController = new AbortController();
		setController(abortController);
		setIsLoading(true);
		fetch('http://127.0.0.1:5000/api/v1' + url, { signal: abortController.signal })
			.then((resp) => resp.json())
			.then((data) => {
				setData(data);
			})
			.catch((error) => {
				if (error.name === 'AbortError') {
					console.log(error);
					return console.log('Request cancelled');
				}
				setError(error);
			})
			.finally(() => setIsLoading(false));
		return () => abortController.abort();
	}, []);

	const handleCancelRequest = () => {
		if (controller) {
			controller.abort();
			setError('Request cancelled');
		}
	};

	return { data, isLoading, error, handleCancelRequest };
}
