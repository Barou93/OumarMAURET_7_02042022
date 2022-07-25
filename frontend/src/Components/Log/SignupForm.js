import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../style/assets/img/icon-left-font.png"
import SigninForm from "./SigninForm"
const SignupForm = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formSubmit, setFormSubmit] = useState(false);


    const handleRegister = async (e) => {
        e.preventDefault();
        const prenameError = document.querySelector('.firstname.errors');
        const nameError = document.querySelector('.lastname.errors');
        const emailError = document.querySelector('.email.errors');
        const passwordError = document.querySelector('.password.errors');


        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/register`,
            withCredentials: true,
            data: {
                firstname,
                lastname,
                email,
                password
            }

        })
            .then((res) => {
                console.log(res);
                if (res.data.errors) {
                    prenameError.innerHTML = res.data.errors.firstname;
                    nameError.innerHTML = res.data.errors.lastname;
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    setFormSubmit(true);
                }
            }).catch((err) => {
                console.log(err.message)
            })
    }
    return (
        <div>
            {formSubmit ? (
                <>
                    <h1 className='success'>Votre compte a été créé avec succèss.Veuillez-vous connecter.</h1>
                    <SigninForm />
                </>
            ) : (
                <>
                    <header className="main-header">
                        <div className="logo__container">
                            <img src={Logo} alt="Logo Groupomania" className="logo__container__img" />
                        </div>
                    </header>
                    <h1 className="main_title">Partagez et restez en contact avec vos collègues.</h1>
                    <div className="register">
                        <div className="register__form">
                            <form action="#" className="form__signup" onSubmit={handleRegister}>
                                <div className="firstname-container">
                                    <label htmlFor="firstname">Prénom</label>
                                    <br />
                                    <input
                                        type="text" id="firstname"
                                        value={firstname}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Entrez votre nom" />
                                </div>
                                <div className="firstname errors"></div>
                                <br />
                                <div className="lastname-container">
                                    <label htmlFor="lastname">Nom</label>
                                    <br />
                                    <input type="text"
                                        id="lastname"
                                        value={lastname}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Entrez votre prénom" />
                                </div>
                                <div className="lastname errors"></div>
                                <br />
                                <div className="email-container">
                                    <label htmlFor="email">Email</label>
                                    <br />
                                    <input type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Entrez votre adresse email" />
                                </div>
                                <div className="email errors"></div>
                                <br />
                                <div className="password-container">
                                    <label htmlFor="password">Mot de passe (8 caractères minimum)</label>
                                    <br />
                                    <input type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Entrez votre mot de passe" />
                                </div>
                                <div className="password errors"></div>
                                <br />
                                <input type="submit" value="S'inscrire" />
                                <div className="account">
                                    <p>Déjà inscrit(e) ?</p>
                                    <Link to="/login" className='account__signup'>S'identifier</Link>
                                </div>
                            </form>
                        </div>
                    </div >
                </>
            )}


        </div >
    );
};

export default SignupForm;