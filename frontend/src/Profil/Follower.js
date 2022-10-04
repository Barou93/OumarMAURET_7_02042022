import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import FollowHandler from "./FollowHandler";
import NoFollower from '.././style/assets/icons/nofollow.png';


const Follower = ({ followerId, type }) => {
    const userData = useSelector((state) => state.userReducer);
    //const [isOpening, setIsOpening] = useState(false);
    const { id: userId } = useParams();
    const [followersPopup, setFollowersPopup] = useState(false);
    const [followerList, setFollowerList] = useState(false);

    const usersData = useSelector((state) => state.usersReducer);

    const userFollowers = usersData.find(user => user.id === userId).follower.map(follower => follower.followingId);




    return (

        <>
        <header className="followers__modal__header">

                Mes Followers

            </header>
            {!followersPopup && (
                <div className="followers__modal__content">
                    <ul className="followers__items">
                        {(usersData.map(user => {

                            if (userFollowers.includes(user.id)) {
                                return (
                                    <li key={user.id} className="followers__modal__followers">
                                        <Link
                                            exat="true"
                                            to={`/${user.id}`}
                                            className="followers__modal__followers__links"
                                        >
                                            <img src={user.picture} alt="" />
                                            <h4>{user.firstname + " " + user.lastname} </h4>
                                        </Link>
                                        {user.id !== userData.id ? < FollowHandler followerId={user.id} type={'suggestion'} /> : null}
                                    </li>
                                )
                            }
                            return null


                        }))}


                    </ul>

                </div>

            )}

        </>

    );
};

export default Follower;

/**{followerList === false && (
                            (
                                <div className="nofollower__container">
                                    <div className="nofollower__img">
                                        <img src={NoFollower} alt="user-nofollow" />
                                    </div>
                                    <div className="nofollower__text">
                                        <h2>Aucun abonné pour le moment</h2>
                                    </div>
                                </div>
                            )
                        )} */
