import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useMemo } from 'react';

import PropTypes from 'prop-types';
import { usersApiCreate, usersApiDelete, usersApiGet, usersApiUpdate } from '../service/user.services';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const { data: users } = useQuery({ queryKey: ['users'], queryFn: usersApiGet });

	const queryClient = useQueryClient();

	const addUser = useMutation({
		mutationFn: usersApiCreate,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});

	const updateUser = useMutation({
		mutationFn: usersApiUpdate,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});

	const deleteUser = useMutation({
		mutationFn: usersApiDelete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});

	const value = useMemo(
		() => ({
			users,
			addUser,
			updateUser,
			deleteUser,
		}),
		[users]
	);
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
	children: PropTypes.node,
};

export const useUserContext = () => {
	return useContext(UserContext);
};
