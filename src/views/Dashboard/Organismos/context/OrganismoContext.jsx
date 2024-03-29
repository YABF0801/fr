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
	const queryOrganismos = useQuery({ queryKey: ['organismos'], queryFn: organismosApiGet });

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
			queryOrganismos,
			addOrganismo,
			updateOrganismo,
			deleteOrganismo,
		}),
		[queryOrganismos]
	);

	return <OrganismoContext.Provider value={value}>{children}</OrganismoContext.Provider>;
};

OrganismoProvider.propTypes = {
	children: PropTypes.node,
};

export const useOrganismoContext = () => {
	return useContext(OrganismoContext);
};
