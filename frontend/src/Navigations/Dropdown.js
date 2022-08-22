import React from "react";
import { Link } from 'react-router-dom';
import DropdownItem from "./DropdownItem";
import Logout from "../Components/Log/Logout";
import { useSelector } from "react-redux";


const Dropdown = () => {
    //const [activeProfilMenu, setActiveProfilMenu] = useState('dropdown');
    const userData = useSelector((state) => state.userReducer);

    return (

        <DropdownItem>
            <div className="profil">
                <div className="profil__container">
                    <div className="profil__account">
                        <Link to="/profil">
                            <img src={userData.picture}
                                className="user_profil"
                                alt="profil User" />
                        </Link>
                    </div>
                    <Link to="/profil" className="profil__details">
                        <span>{userData.firstname + " " + userData.lastname} </span>
                        <p>Voir votre profil</p>
                    </Link>
                </div>
            </div>
            <hr />
            <div className="header__dropdown__home">
                <Link to="/" className="icon">
                    Retourner au fil d'actualité
                </Link>
            </div>
            <div className="header__dropdown__dark">
                <Link to="/dark-mode" className="icon">
                    Activer le mode sombre
                </Link>
            </div>
            <div className="header__dropdown__paramas">
                <Link to="/settings" className="icon">
                    Paramètres
                </Link>
            </div>
            <div className="header__dropdown__logout">
                <Logout />
            </div>
        </DropdownItem>

    );
};

export default Dropdown;
