import { toast } from 'react-toastify';

const ToastNotification = (type, message) => {
    
    toast[type](message, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

export default ToastNotification

