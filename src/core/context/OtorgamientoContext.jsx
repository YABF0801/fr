import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
	FechaOmApiGet,
	saveFechaOm,
	resetFechaOm,
	getContadorGp,
	setContadorGp,
	resetContadorGp,
	resetToolsArrays,
	getContadorCc,
	setContadorCc,
} from '../../utils/utiles.sevices';
import { nuevoCursoApi } from '../../views/Dashboard/Circulos/service/circulo.services';
import { consecustiveApiReset } from '../../views/Dashboard/GeneralList/service/submision.services';


const OtorgamientoContext = createContext();

export const OtorgamientoProvider = ({ children }) => {

	const queryFechaOm = useQuery({ queryKey: ['fecha'], queryFn: FechaOmApiGet });

	const queryContadorCambioCurso = useQuery({ queryKey: ['contadorcc'], queryFn: getContadorCc });

	const queryContadorPropGeneradas = useQuery({ queryKey: ['contadorgp'], queryFn: getContadorGp });


	const queryClient = useQueryClient();

	const guardarFecha = useMutation({
		mutationFn: saveFechaOm,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['fecha'] });
		},
	});

	const resetearFecha = useMutation({
		mutationFn: resetFechaOm,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['fecha'] });
		},
	});


	const setContadorProp = useMutation({
		mutationFn: setContadorGp,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['contadorgp'] });
		},
	});

	const resetContadoresPropyCc = useMutation({
		mutationFn: resetContadorGp,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['contadorgp'] });
		},
	});

	const setContadorCambioCurso = useMutation({
		mutationFn: setContadorCc,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['contadorcc'] });
		},
	});

	const nuevoCurso = useMutation({
		mutationFn: nuevoCursoApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['curso'] });
		},
	});

	const resetArrays = useMutation({
		mutationFn: resetToolsArrays,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['arrays'] });
		},
	});

	const resetearConsecutivo = useMutation({
		mutationFn: consecustiveApiReset,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['fecha'] });
		},
	});

	const value = useMemo(
		() => ({
			queryFechaOm,
			queryContadorCambioCurso,
			queryContadorPropGeneradas,
			guardarFecha,
			resetearFecha,
			setContadorProp,
			resetContadoresPropyCc,
			setContadorCambioCurso,
			nuevoCurso,
			resetArrays,
			resetearConsecutivo
		}),
		[queryFechaOm, queryContadorCambioCurso, queryContadorPropGeneradas]
	);

	return <OtorgamientoContext.Provider value={value}>{children}</OtorgamientoContext.Provider>;
};

OtorgamientoProvider.propTypes = {
	children: PropTypes.node,
};

export const useOtorgamientoContext = () => {
	return useContext(OtorgamientoContext);
};
