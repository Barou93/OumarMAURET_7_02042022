import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils';

const Sidebar = () => {
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const [isFound, setIsFound] = useState(true);


    useEffect(() => {
        !isEmpty(usersData[0]) && setIsFound(false);

    }, [usersData])
    return (
        <div>
            <div className="sidebar_responsive">
                <div className="sidebar sidebar_toggle">
                    <h2>Vos Collaborateurs</h2>
                    {!isEmpty(usersData) &&
                        usersData.map((user) => {
                            if (user.id !== userData.id) {
                                return (
                                    <>
                                        <div className="sidebar__members">
                                            <a key={user.id} href="/profil/id" className="sidebar__members__links online">
                                                <img src={user.picture} alt="Profil membres de l'entreprise"
                                                    className="sidebar__members__icons" />
                                                <p>{user.firstname + " " + user.lastname} </p>
                                            </a>
                                        </div>
                                    </>
                                )
                            }
                            return null

                        })}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;