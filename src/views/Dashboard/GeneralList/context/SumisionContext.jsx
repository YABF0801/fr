import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useMemo } from 'react';

import PropTypes from 'prop-types';
import {
	submisionsApiBaja,
	submisionsApiCreate,
	submisionsApiDelete,
	submisionsApiGet,
	submisionsApiUpdate,
} from '../service/submision.services';

const SubmisionContext = createContext();

export const SubmisionProvider = ({ children }) => {
	const querySubmision = useQuery({ queryKey: ['submisions'], queryFn: submisionsApiGet });

	const queryClient = useQueryClient();

	const addSubmision = useMutation({
		mutationFn: submisionsApiCreate,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['submisions'] });
		},
	});

	const updateSubmision = useMutation({
		mutationFn: submisionsApiUpdate,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['submisions'] });
		},
	});

	const deleteSubmision = useMutation({
		mutationFn: submisionsApiDelete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['submisions'] });
		},
	});

	const bajaSubmision = useMutation({
		mutationFn: submisionsApiBaja,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['submisions'] });
		},
	});

	const value = useMemo(
		() => ({
			querySubmision,
			addSubmision,
			updateSubmision,
			deleteSubmision,
			bajaSubmision,
		}),
		[querySubmision]
	);


	return <SubmisionContext.Provider value={ value }>{ children }</SubmisionContext.Provider>;
};

SubmisionProvider.propTypes = {
	children: PropTypes.node,
};

export const useSubmisionContext = () => {
	return useContext(SubmisionContext);
};
