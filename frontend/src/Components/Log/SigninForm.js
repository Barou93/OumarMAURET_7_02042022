import React, { useState } from "react";
import axios from "axios";
import Logo from "../../style/assets/img/icon-left-font.png";
import { Link } from "react-router-dom";

const SigninForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const handleLogin = (e) => {
        e.preventDefault();

        const emailError = document.querySelector(".email.errors");
        const passwordError = document.querySelector(".password.errors");
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                email,
                password,
            },
        })
            .then((res) => {
                console.log(res)
                if (res.data.errors) {
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password
                } else {
                    window.location = "/";
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>

            <>
                <header className="main-header">
                    <div className="logo__container">
                        <img
                            src={Logo}
                            alt="Logo Groupomania"
                            className="logo__container__img"
                        />
                    </div>
                </header>
                <div className="register register_signin">
                    <div className="register__form signin">
                        <div className="header__content">
                            <h1 className="header__content__heading">S'identifier</h1>
                            <p className="header__content__subheading">
                                Tenez-vous au courant des nouvelles de vos collaborateurs
                            </p>
                        </div>
                        <form action="#" onSubmit={handleLogin} id="sign-in-form">
                            <div className="email-container">
                                <label htmlFor="email">Email</label>
                                <br />
                                <input
                                    type="email"
                                    id="email"
                                    className="mail"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    placeholder="Entrez votre adresse email"
                                />
                            </div>
                            <div className="email errors"></div>

                            <br />
                            <div className="password-container">
                                <label htmlFor="password">
                                    Mot de passe
                                </label>
                                <br />
                                <input
                                    type="password"
                                    id="password"
                                    className="pass"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    placeholder="Entrez votre mot de passe"
                                />
                            </div>
                            <div className="password errors"></div>
                            <br />
                            <Link to="/forgot-password" className="forgot-password">

                                Mot de passe oublié ?
                            </Link>
                            <br />
                            <input
                                type="submit"
                                value="Se connecter"
                                className="submit"
                            />
                        </form>
                        <div className="account">
                            <p>Vous n'avez pas de compte ?</p>
                            <Link to="/register" className="account__signup">
                                S'inscrire
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default SigninForm;
