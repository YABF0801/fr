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
      style: {backgroundColor: 'rgba(220, 250, 255, 0.715'}, 
      transition: Zoom,
    });
  };

export default ToastNotification

