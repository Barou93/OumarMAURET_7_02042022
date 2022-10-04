import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
                    <div className="sidebar__user__infos">
                        <div className="sidebar__user__infos__cover__pic">
                            <img src={userData.coverPicture} alt="user-cover-pic" />
                        </div>
                        <div className="sidebar__user__infos__profil__pic">
                            <Link exact="true" to={`/${userData.id}`}>
                                <img src={userData.picture} alt="user-cover-pic" />
                            </Link>
                        </div>
                        <Link exact="true" className="userpseudo" to={`/${userData.id}`}>{`${userData.firstname}${" "}${userData.lastname}`} </Link>
                        <div className="sidebar__user__infos__follow">
                            <div className="sidebar__user__infos__follow__followed">
                                <p>{userData.follower ? userData.follower.length : 0} </p>
                                <span>Abonnés</span>
                            </div>
                            <div className="sidebar__user__infos__follow__follower">
                                <p>{userData.following ? userData.following.length : 0}</p>
                                <span>Abonnements</span>
                            </div>

                        </div>


                    </div>
                    <div className="sidebar__members__container">

                        <h2>Vos Collaborateurs</h2>
                        {!isEmpty(usersData) &&
                            usersData.map((user) => {
                                if (user.id !== userData.id) {
                                    return (
                                        <>
                                            <div key={user.id} className="sidebar__members">
                                                <Link exact="true" to={`/${user.id}`} className="sidebar__members__links online">
                                                    <img src={user.picture} alt="Profil membres de l'entreprise"
                                                        className="sidebar__members__icons" />
                                                    <p>{user.firstname + " " + user.lastname} </p>
                                                </Link>
                                            </div>
                                        </>
                                    )
                                }
                                return null

                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;