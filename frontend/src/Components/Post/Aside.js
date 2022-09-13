import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Aside = () => {
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    return (
        <aside className='aside'>
            <div className="aside__container">
                <h2>Ajouter à votre fil d'actualité</h2>
                {usersData ? usersData.map((user) => {

                    if (user.id !== userData.id) {
                        return (
                            <>
                                <div className="sidebar__members aside__followers">
                                    <div key={user.id} className="aside__followers__infos">
                                        <Link exact to={`/${user.id}`}>
                                            <img src={user.picture} alt="profil de personne à suivre"
                                                className="sidebar__members__icons aside__user__icons" />
                                        </Link>
                                        <p>{user.firstname + " " + user.lastname} </p>
                                        <span className="aside__followers__details">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis placeat porro reprehenderit fugit nulla
                                        </span>
                                        <a href="#14" className="aside__followers__follow">Suivre</a>
                                    </div>
                                </div>
                            </>
                        )

                    }
                    return null

                }) : null}

            </div>

        </aside >
    );
};

export default Aside;