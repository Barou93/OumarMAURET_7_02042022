import React from 'react';
import ReactDOM from "react-dom";

const ModalRoot = document.getElementById('modal-root');

const Modal = ({ open, children }) => {
    if (!open) return null

    return ReactDOM.createPortal(

        <>
            <div className="modal-overlay">
                <div className="modal-wrapper" >
                    <div
                        onClick={e => {
                            // do not close modal if anything inside modal content is clicked
                            e.stopPropagation();
                        }}
                        className="modal followers__modal__popup">
                        {children}
                    </div>
                </div>
            </div>
        </>,
        ModalRoot

    )
}


export default Modal;