

const SuccessMsg = (task, item, custom='') => {
    const successMessages = {
      create: `Nuevo ${item} cread${item === 'planilla' ? 'a' : 'o'}`,
      update: `${item.charAt(0).toUpperCase() + item.slice(1)} actualizad${item === 'planilla' ? 'a' : 'o'}`,
      delete: `${item.charAt(0).toUpperCase() + item.slice(1)} eliminad${item === 'planilla' ? 'a' : 'o'}`,
      custom: `${item.charAt(0).toUpperCase() + item.slice(1)} ${custom}`,

    };
    const errorMessage = successMessages[task];
    
    return errorMessage || null;
  };
  
  export default SuccessMsg;


     
  