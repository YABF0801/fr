import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useMemo } from 'react';
import { circulosApiGet, circulosApiCreate, circulosApiUpdate, circulosApiDelete } from '../service/circulo.services';
import PropTypes from 'prop-types';

const CirculoContext = createContext();

export const CirculoProvider = ({ children }) => {
	const { data: circulos = null } = useQuery({ queryKey: ['circulos'], queryFn: circulosApiGet,  });
	
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


	const value = useMemo(
		() => (
			{
			circulos,
			addCirculo,
			updateCirculo,
			deleteCirculo,	
		}),
		[circulos]
	);
	
	if (circulos === null) {
		return <div>Cargando circulos...</div>;
	  }
	
	return <CirculoContext.Provider value={value}>{children}</CirculoContext.Provider>;
};

CirculoProvider.propTypes = {
	children: PropTypes.node,
};

export const useCirculoContext = () => {
	return useContext(CirculoContext);
};
