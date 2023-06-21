
export const userInitialValues = (user) => {


    const initialValues = {
        nickname: user ? user.nickname: '',
        name: user ? user.name: '',
        lastname: user ? user.lastname: '',
        position: user ? user.position: '',
        role: user ? user.role: 'guest',
        };
        return initialValues;
    };
