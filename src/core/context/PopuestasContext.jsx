import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useMemo } from 'react';

import PropTypes from 'prop-types';
import {
	propuestaApiAceptar,
	propuestaApiGenerar,
	propuestaApiRechazar,
	propuestasApiGet,
} from '../services/propuestas.services';

const PropuestasContext = createContext();

export const PropuestasProvider = ({ children }) => {
	const queryPropuestas = useQuery({ queryKey: ['propuestas'], queryFn: propuestasApiGet });

	const queryClient = useQueryClient();

	const generarPropuestas = useMutation({
		mutationFn: propuestaApiGenerar,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['propuestas'] });
		},
	});

	const aceptarPropuestas = useMutation({
		mutationFn: propuestaApiAceptar,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['propuestas'] });
		},
	});

	const rechazarPropuestas = useMutation({
		mutationFn: propuestaApiRechazar,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['propuestas'] });
		},
	});

	const value = useMemo(
		() => ({
			queryPropuestas,
			generarPropuestas,
			aceptarPropuestas,
			rechazarPropuestas,
		}),
		[queryPropuestas]
	);

	return <PropuestasContext.Provider value={value}>{children}</PropuestasContext.Provider>;
};

PropuestasProvider.propTypes = {
	children: PropTypes.node,
};

export const usePropuestasContext = () => {
	return useContext(PropuestasContext);
};
