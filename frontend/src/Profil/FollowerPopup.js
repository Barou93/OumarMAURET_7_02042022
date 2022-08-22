import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Components/Log/Modals";
import FollowHandler from "./FollowHandler";

const FollowerPopup = ({ followerId, type }) => {
    const userData = useSelector((state) => state.userReducer);
    const [isOpening, setIsOpening] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);

    //const usersData = useSelector((state) => state.usersReducer);



    return (
        <Modal open={!isOpening} onClick={() => setIsOpening(isOpening)}>
            <span
                onClick={() => setIsOpening(!isOpening)}
                className="followers__modal__close"
            ></span>
            <header className="followers__modal__header">

                <button

                    className="followings active-followings"
                >
                    Mes Abonnements
                </button>
            </header>

            {/**Les personnes suivis par l'utilsateur */}
            {!followersPopup && (
                <>
                    <div className="followers__modal__content">
                        <ul>
                            {userData.followers
                                ? userData.followers.map((user) => {
                                    return (
                                        <li key={user.id} className="followers__modal__followers">
                                            <a
                                                href={user.id}
                                                className="followers__modal__followers__links"
                                            >
                                                <img src={user.picture} alt="" />
                                                <h4>{user.firstname + " " + user.lastname} </h4>
                                            </a>
                                            <FollowHandler followerId={user.id} type={'suggestion'} />
                                        </li>
                                    );

                                })
                                : null}
                        </ul>
                    </div>
                </>
            )}{" "}


        </Modal>
    );
};

export default FollowerPopup;
