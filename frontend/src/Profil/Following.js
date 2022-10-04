import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import FollowHandler from "./FollowHandler";



const Following = ({ followerId, type }) => {
    const userData = useSelector((state) => state.userReducer);

    const { id: userId } = useParams();

    const [followingsPopup, setFollowingsPopup] = useState(false);
    const [followList, setFollowList] = useState(false);

    const usersData = useSelector((state) => state.usersReducer);
    const userFollowers = usersData.find(user => user.id === userId).following.map(following => following.followerId);





    return (

        <>
            <header className="followers__modal__header">

                Mes Abonnemments

            </header>
            {!followingsPopup && (
                <>
                    <div className="followers__modal__content">
                        <ul className="followers__items">
                            {(usersData.map(user => {


                                if (userFollowers.includes(user.id)) {
                                    return (
                                        <li key={user.id} className="followers__modal__followers">
                                            <a
                                                href={`/${user.id}`}
                                                className="followers__modal__followers__links"
                                            >
                                                <img src={user.picture} alt="" />
                                                <h4>{user.firstname + " " + user.lastname} </h4>
                                            </a>
                                            {user.id !== userData.id ? < FollowHandler followerId={user.id} type={'suggestion'} /> : null}
                                        </li>
                                    )
                                }
                                return null;
                            }))}




                        </ul>
                    </div>
                </>
            )}{" "}

        </>

    );
};

export default Following;



/** { && (


                               
                            )


                            } */