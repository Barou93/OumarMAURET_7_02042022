import React from 'react';
import ReactDOM from 'react-dom';

const LightBoxRoot = document.getElementById('ligthbox');

const LigthBox = ({ open, children }) => {
    if (!open) return null
    return ReactDOM.createPortal(
        <>
            <div className="lightbox">
                <button
                    onClick={(!open)}
                    class="lightbox__close"></button>
                <div
                    onClick={e => {
                        // do not close modal if anything inside modal content is clicked
                        e.stopPropagation();
                    }}
                    class="lightbox__container">
                    {children}

                </div>

            </div>
        </>,
        LightBoxRoot
    )
};

export default LigthBox;