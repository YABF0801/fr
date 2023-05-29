
export const userInitialValues = (user) => {


    const initialValues = {
        nickname: user ? user.nickname: '',
        name: user ? user.name: '',
        lastname: user ? user.lastname: '',
        password: user ? user.password: '',
        position: user ? user.position: '',
        role: user ? user.role: '',
        };
        return initialValues;
    };
