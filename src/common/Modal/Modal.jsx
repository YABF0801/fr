import { Modal } from 'react-bootstrap';

const ModalBase = ({ show, ModalBody, onHide }) => {
	return (
		<Modal
			show={show}
			size='lg'
			onHide={onHide}
			centered
			backdropClassName='custom-backdrop'
			dialogClassName='custom-modal'
		>
			<Modal.Body>
				{ModalBody}
			</Modal.Body>
		</Modal>
	);
};
export default ModalBase;
