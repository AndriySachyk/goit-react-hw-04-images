import React from "react"
import { Overlay, ModalBox } from "./Modal-style"
import PropTypes from 'prop-types';



export const Modal = ({ consoleModal, image }) => {
    return (
        
        <Overlay onClick={consoleModal} id="overlay">
            <ModalBox className="modal">
                   <img src={image} alt="" width={800} height={600} />
            </ModalBox>
        </Overlay>    
        
    )
}



Modal.propTypes = {
    consoleModal: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
}