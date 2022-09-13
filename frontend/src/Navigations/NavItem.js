import React, { useState } from "react";
import NavIcon from "./NavIcon";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

import Dropdown from "./Dropdown";
import Notifications from './Notifications';


const NavItem = () => {
    const [open, setOpen] = useState(false);
    const [openInfos, setOpenInfos] = useState(false);

    const userData = useSelector((state) => state.userReducer);



    return (
        <>
            <div className="header__menu">
                <Link to="/" className="header__menu__box">
                    <span className="header__menu__icon home"></span>
                    <span className="header__menu__title home">Accueil</span>
                </Link>
                <Link to="/messages" className="header__menu__box">
                    <span className="header__menu__icon inbox"></span>
                    <span className="header__menu__title inbox">Messages</span>
                </Link>
                <Link to="/forums" className="header__menu__box">
                    <span className="header__menu__icon group"></span>
                    <span className="header__menu__title group">Forums</span>
                </Link>
            </div>
            <NavIcon>
                <Link exact="true" to={`/${userData.id}`} className="header__user__infos">
                    <img src={userData.picture} className="header__account" alt="profil user" />
                    <span className="username">{userData.firstname + "  " + userData.lastname}</span>
                </Link>
                <div className="header__notifications" onClick={() => setOpenInfos(!openInfos)}>
                    {openInfos ? <Notifications /> : null}
                </div>

                <div className="header__setting" onClick={() => setOpen(!open)}>
                    {open ? <Dropdown /> : null}
                </div>
            </NavIcon>
        </>
    );
};

export default NavItem;
