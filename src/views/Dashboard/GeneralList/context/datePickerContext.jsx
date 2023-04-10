import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useMemo } from 'react';

import PropTypes from 'prop-types';


const DatePickerContext = createContext();

export const DatePickerProvider = ({ children }) => {
    
const queryClient = useQueryClient();


/* const bajaSubmision = useMutation({
    mutationFn: submisionsApiBaja,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['submisions'] });
    },
}); */

const value = useMemo(
    () => ({

    }),
    []
);


return <DatePickerContext.Provider value={value}>{children}</DatePickerContext.Provider>;
};

DatePickerProvider.propTypes = {
children: PropTypes.node,
};

export const useDatePickerContext = () => {
return useContext(DatePickerContext);
};
