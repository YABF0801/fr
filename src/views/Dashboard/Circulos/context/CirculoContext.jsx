import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useMemo } from 'react';
import { circulosApiGet, circulosApiCreate, circulosApiUpdate, circulosApiDelete, circulosApiStatus, pastCirculosApiGet, pastCirculosSetArray } from '../service/circulo.services';
import PropTypes from 'prop-types';

const CirculoContext = createContext();

export const CirculoProvider = ({ children }) => {
	const queryCirculos = useQuery({ queryKey: ['circulos'], queryFn: circulosApiGet,  });

	const queryPastCirculos = useQuery({ queryKey: ['pastCirculos'], queryFn: pastCirculosApiGet,  });

	const queryPastCirculosArray = useQuery({ queryKey: ['pastCirculos'], queryFn: pastCirculosSetArray,  });
	
	const queryClient = useQueryClient();

	const addCirculo = useMutation({
		mutationFn: circulosApiCreate,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['circulos'] });
		},
	});

	const updateCirculo = useMutation({
		mutationFn: circulosApiUpdate,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['circulos'] });
		},
	});

	const deleteCirculo = useMutation({
		mutationFn: circulosApiDelete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['circulos'] });
		},
	});

	const changeStatusCirculo = useMutation({
		mutationFn: circulosApiStatus,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['circulos'] });
		},
	});

	const value = useMemo(
		() => (
			{
			queryCirculos,
			queryPastCirculos,
			queryPastCirculosArray,
			addCirculo,
			updateCirculo,
			deleteCirculo,
			changeStatusCirculo,	
		}),
		[queryCirculos, queryPastCirculos]
	);
	
		return <CirculoContext.Provider value={value}>{children}</CirculoContext.Provider>;
};

CirculoProvider.propTypes = {
	children: PropTypes.node,
};

export const useCirculoContext = () => {
	return useContext(CirculoContext);
};
