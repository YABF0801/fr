import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useMemo } from 'react';

import PropTypes from 'prop-types';
import {
	organismosApiCreate,
	organismosApiDelete,
	organismosApiGet,
	organismosApiUpdate,
} from '../service/organismo.services';

const OrganismoContext = createContext();

export const OrganismoProvider = ({ children }) => {
	const { data: organismos = null } = useQuery({ queryKey: ['organismos'], queryFn: organismosApiGet });

	const queryClient = useQueryClient();

	const addOrganismo = useMutation({
		mutationFn: organismosApiCreate,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['organismos'] });
		},
	});

	const updateOrganismo = useMutation({
		mutationFn: organismosApiUpdate,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['organismos'] });
		},
	});
 
	const deleteOrganismo = useMutation({
		mutationFn: organismosApiDelete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['organismos'] });
		},
	});

	const value = useMemo(
		() => ({
			organismos,
			addOrganismo,
			updateOrganismo,
			deleteOrganismo,
		}),
		[organismos]
	);

	if (organismos === null) {
		return <div>Cargando organismos...</div>;
	  }
	return <OrganismoContext.Provider value={value}>{children}</OrganismoContext.Provider>;
};

OrganismoProvider.propTypes = {
	children: PropTypes.node,
};

export const useOrganismoContext = () => {
	return useContext(OrganismoContext);
};
