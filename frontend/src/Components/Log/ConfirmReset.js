import React from 'react';
import SuccessIcon from "../../style/assets/icons/success-svgrepo-com.svg"
import { Link } from "react-router-dom";
const ConfirmReset = () => {
    return (
        <>
            <div className="success__container">
                <div className="success__container__img">
                    <img src={SuccessIcon} alt="" className="success-icon" />
                </div>
                <div className="success__container__message">
                    <h1>Votre mot de passe a été modifié avec succès</h1>
                    <p>Utilisez votre nouveau mot de passe pour vous connecter</p>
                </div>
                <div className="success__container__login">
                    <Link to="/login" className=' success-btn'>S'identifier</Link>
                </div>
            </div>
        </>
    );
};

export default ConfirmReset;