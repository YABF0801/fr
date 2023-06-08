import ToastNotification from "../common/Toasts/toasts";

export const getErrorMessage = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
    return 'Error desconocido';
  };
  
  export const handleToastyError = (error) => {
    const errorMessage = getErrorMessage(error);
     ToastNotification('error', errorMessage );
     throw error;
  };
  