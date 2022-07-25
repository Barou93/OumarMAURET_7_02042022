import axios from 'axios';
import React, { useState } from 'react';
import Logo from "../../style/assets/img/icon-left-font.png"
import ConfirmReset from './ConfirmReset';

const ResetForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");



    const handleReset = (e) => {
        e.preventDefault();
        const emailErr = document.querySelector('.email.errors');
        const newPassErr = document.querySelector('.password.errors');
        const confirmPassErr = document.querySelector('.confirmpassword.errors');

        axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/forgot-password`,
            withCredentials: true,
            data: {
                email,
                newPassword,
                confirmNewPassword
            }
        }).then((res) => {
            console.log(res);
            if (res.data.errors) {
                emailErr.innerHTML = res.data.errors.email;
                newPassErr.innerHTML = res.data.errors.newPassword;
                confirmPassErr.innerHTML = res.data.errors.confirmNewPassword;
            } else {
                setFormSubmit(true);
            }
        }).catch(err => console.log(err.message))
    }
    return (
        <div>
            {formSubmit ? (
                <>
                    <ConfirmReset />

                </>
            ) : (
                <>
                    <header className="main-header">
                        <div className="logo__container">
                            <img src={Logo} alt="Logo groupomania" className="logo__container__img" />
                        </div>
                    </header>
                    <div className="register register_signin reset">
                        <div className="register__form signin reset__form">
                            <div className="header__content">
                                <h1 className="header__content__heading">Mot de passe oublié ?</h1>
                                <p className="header__content__sub">Réinitialiser votre mot de passe</p>
                            </div>
                            <>
                            </>
                            <form action="#" onSubmit={handleReset}>
                                <div className="email-container">
                                    <label htmlFor="email">Email</label>
                                    <br />
                                    <input type="email"
                                        id="email"
                                        className="mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Entrez votre adresse email" />
                                </div>
                                <div className="email errors"></div>
                                <br />
                                <div className="password-container">
                                    <label htmlFor="password">Nouveau Mot de passe (8 caractères minimum)</label>
                                    <br />
                                    <input type="password" id="password"
                                        className="pass"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Entrez votre mot de passe" />
                                </div>
                                <div className="password errors"></div>
                                <br />
                                <div className="password-container">
                                    <label htmlFor="password">Confirmer nouveau mot de passe (8 caractères minimum)</label>
                                    <br />
                                    <input type="password" id="password"
                                        className="pass"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        placeholder="Entrez votre mot de passe" />
                                </div>
                                <div className="confirmpassword errors"></div>

                                <input type="submit" value="Réinitialiser le mot de passe" className="submit" />
                            </form>
                        </div>

                    </div>
                </>
            )}

        </div>
    );
};

export default ResetForm;