import { useMemo } from "react";
import { Modal } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const DeleteModal = ({ handleCloseDelModal, deleteById,  }) => {
  console.log("DeleteModal ha sido renderizado");

  const modal = useMemo(() => {
  return (

    <>
        <Modal 
        backdrop='static' 
        keyboard={false}
        >
        
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
					<div className='p-2 d-flex justify-content-center '>
								<h1 > <i className="text-lg-start text-warning bi bi-exclamation-octagon"></i></h1>
                <h4 className="m-3 text-secondary"> ¿Está seguro que desea eliminar?</h4>
					</div>
          
            </Modal.Body>
          <Modal.Footer>
          <button className="btn cancel-btn" onClick={handleCloseDelModal}> Cancelar</button>
          <button className="btn save-btn" onClick={deleteById}> Eliminar</button>
          </Modal.Footer>
        </Modal>
        </>
       );
      }, [handleCloseDelModal, deleteById]);

      return modal;
    };
  
  
  export default DeleteModal;