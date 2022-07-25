import React from "react";
import { Link } from 'react-router-dom';
import DropdownItem from "./DropdownItem";
import User from ".././style/assets/img/user_8.jpg";
import Logout from "../Components/Log/Logout";


const Dropdown = () => {
    //const [activeProfilMenu, setActiveProfilMenu] = useState('dropdown');

    return (

        <DropdownItem>
            <div className="profil">
                <div className="profil__container">
                    <div className="profil__account">
                        <a href="/profil">
                            <img src={User}
                                className="user_profil"
                                alt="profil User" />
                        </a>
                    </div>
                    <div className="profil__details">
                        <span>Amadou Maïga</span>
                        <p>Voir votre profil</p>
                    </div>
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
