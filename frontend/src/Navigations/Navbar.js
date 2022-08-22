import React, { useContext } from 'react';

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
                            <a href="/" className="header__img">
                                <span className="search-icon"></span>
                                <input type="text"
                                    className="header__input"
                                    placeholder='Rechercher sur Groupomania ' />
                            </a>
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