import { toast, Zoom } from 'react-toastify';

const ToastNotification = (type, message) => {
    
    toast[type](message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Zoom,
    });
  };

export default ToastNotification

