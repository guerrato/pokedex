import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
    children?:any;
    showModal:boolean;
    handleClose?: (e:React.MouseEvent<HTMLButtonElement>) => void;
};

const PokeModal = ({children, showModal = false, handleClose}:Props) => {
    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Pokemon Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
  }

export default PokeModal;