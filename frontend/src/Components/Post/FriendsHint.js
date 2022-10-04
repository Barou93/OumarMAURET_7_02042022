import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FollowHandler from '../../Profil/FollowHandler';
import { isEmpty } from '../Utils';

const FriendsHint = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [playOnce, setPlayOnce] = useState(true);
    const [friendsHint, setFriendsHint] = useState([]);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    useEffect(() => {
        const notFriendList = () => {
            let arr = [];


            usersData.map((user) => {
                //Map to check if current  user id's contains in the followerId
                const follower = user.follower.map((users) => users.followingId);

                if (user.id !== userData.id && !follower.includes(userData.id)) {
                    return arr.push(user.id)
                }

            })
            arr.sort(() => 0.5 - Math.random());
            if (window.innerWidth > 780) {
                arr.length = 4
            } else if (window.innerWidth > 720) {
                arr.length = 3;
            } else if (window.innerWidth > 615) {
                arr.length = 2;
            } else if (window.innerWidth > 540) {
                arr.length = 1;
            } else {
                arr.length = 0
            }
            setFriendsHint(arr);
        }

        if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData.id)) {
            notFriendList();
            setIsLoading(false);
            setPlayOnce(false);
        }


    }, [usersData, userData, playOnce])

    return (
        <aside className='aside'>
            <div className="aside__container">
                <h2>Ajouter à votre fil d'actualité</h2>
                {isLoading ? (

                    <div className="icon">
                        <i className='fas fa-spinner fa-spin'></i>
                    </div>

                ) : (
                    <>
                        {friendsHint && friendsHint.map((user) => {
                            for (let i = 0; i < usersData.length; i++) {
                                if (user === usersData[i].id) {
                                    return (
                                        <div key={user.id} className=" aside__followers">
                                            <div className="aside__followers__infos">
                                                <Link exact to={`/${usersData[i].id}`}>
                                                    <img src={usersData[i].picture} alt="profil de personne à suivre"
                                                        className="sidebar__members__icons aside__user__icons" />
                                                </Link>
                                                <p>{usersData[i].firstname + " " + usersData[i].lastname} </p>
                                                <div className="friends__hint">
                                                    <FollowHandler followerId={usersData[i].id} type={"suggestion"} />
                                                </div>

                                            </div>
                                        </div>

                                    )

                                }

                            }

                        })}
                    </>
                )}

            </div>

        </aside >
    );
};

export default FriendsHint;
