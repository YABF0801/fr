import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Tooltip } from 'react-tooltip';
import { useAuthContext } from '../../../../core/context/authContext';
import OmAdministration from './OmAdministration';


<Tooltip
	id='tooltip'
	effect='solid'
	className='diff-arrow'
/>;

const OfCanvasToOm = () => {
	const { isAuthenticated } = useAuthContext();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

{ isAuthenticated.user?.role === 'admin' && ( <button 
      className='btn export-btn' 
      onClick={handleShow} 
      data-tooltip-id='tooltip'
      data-tooltip-content='Otorgamiento masivo'>
        OM
      </button>
      ) }

      <Offcanvas show={show} onHide={handleClose} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><h3>Otorgamiento masivo</h3> <hr/></Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <OmAdministration/>
        </Offcanvas.Body>

      </Offcanvas>
    </>
  );
}

export default OfCanvasToOm;