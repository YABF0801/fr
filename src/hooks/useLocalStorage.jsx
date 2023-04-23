import { useCallback, useMemo, useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
	const [state, setState] = useState(() => {
		const value = localStorage.getItem(key);
		if (!value) return initialValue;
		return JSON.parse(value);
	});
	const setValue = useCallback(
		(value) => {
			if (typeof value === 'function') {
				value = value(state);
			}
			localStorage.setItem(key, JSON.stringify(value));
			setState(value);
		},
		[key, state]
	);
	return useMemo(() => [state, setValue], [state, setValue]);
};
