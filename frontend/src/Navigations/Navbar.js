import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UidContext } from '../Components/AppContext';

import Home from '../Pages/Home';



const Navbar = (props) => {
    const uid = useContext(UidContext);
    return (
        <>
            {uid ? (
                <nav>
                    <div className="header">
                        <div className="header__container">
                            <Link exact="true" to="/" className="header__img">
                                <span className="search-icon"></span>
                                <input type="text"
                                    className="header__input"
                                    placeholder='Rechercher sur Groupomania ' />
                            </Link>
                        </div>
                        {props.children}
                    </div>
                </nav >
            ) : (
                <Home />
            )}
        </>
    );
};

export default Navbar;