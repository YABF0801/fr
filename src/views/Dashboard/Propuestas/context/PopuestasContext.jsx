import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useMemo } from 'react';

import PropTypes from 'prop-types';
import {
	propuestasApiGet,
	propuestaApiAceptar,
	propuestaApiGenerar,
	propuestaApiRechazar
} from '../service/propuestas.services';

const PropuestasContext = createContext();

export const PropuestasProvider = ({ children }) => {
	const { data: propuestas = null } = useQuery({ queryKey: ['propuestas'], queryFn: propuestasApiGet });

	const queryClient = useQueryClient();

	const generarPropuestas = useMutation({
		mutationFn: propuestaApiGenerar,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['submision'] });
		},
	});

	const aceptarPropuestas = useMutation({
		mutationFn: propuestaApiAceptar,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['submision'] });
		},
	});

	const rechazarPropuestas = useMutation({
		mutationFn: propuestaApiRechazar,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['submision'] });
		},
	});

	const value = useMemo(
		() => ({
			propuestas,
			generarPropuestas,
			aceptarPropuestas,
			rechazarPropuestas,
		}),
		[propuestas]
	);


	return <PropuestasContext.Provider value={ value }>{ children }</PropuestasContext.Provider>;
};

PropuestasProvider.propTypes = {
	children: PropTypes.node,
};

export const usePropuestasContext = () => {
	return useContext(PropuestasContext);
};
