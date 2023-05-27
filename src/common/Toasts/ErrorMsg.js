

const ErrorMsg = (task, item, custom='') => {
    const errorMessages = {
      create: `Error al crear ${item} `,
      update: `Error al actualizar ${item}`,
      delete: `Error al eliminar ${item}`,
      custom: `Error al ${custom} ${item}`,

    };
    const errorMessage = errorMessages[task];
    
    return errorMessage || null;
  };
  
  export default ErrorMsg;
  