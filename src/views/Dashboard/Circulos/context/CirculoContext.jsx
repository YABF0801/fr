import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useMemo } from 'react';
import { circulosApiGet, circulosApiCreate, circulosApiUpdate, circulosApiDelete, circulosApiFindById } from '../service/circulo.services';
import PropTypes from 'prop-types';

const CirculoContext = createContext();

export const CirculoProvider = ({ children }) => {
	const { data: circulos } = useQuery({ queryKey: ['circulos'], queryFn: circulosApiGet });
	const { data: circuloFind } = useQuery({ queryKey: ['circulos'], queryFn: circulosApiFindById });

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

/* 	 const findCirculoById = useMemo(async (id) => {
    const circulo = await circulosApiFindById(id);
    return circulo;
  }, []) ;  */


	const value = useMemo(
		() => ({
			circulos,
			circuloFind,
			addCirculo,
			updateCirculo,
			deleteCirculo,
			
		}),
		[circulos]
	);
	return <CirculoContext.Provider value={value}>{children}</CirculoContext.Provider>;
};

CirculoProvider.propTypes = {
	children: PropTypes.node,
};

export const useCirculoContext = () => {
	return useContext(CirculoContext);
};
