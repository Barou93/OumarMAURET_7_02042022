import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Components/Log/Modals";
import FollowHandler from "./FollowHandler";

const FollowingPopup = ({ followerId, type }) => {
    const userData = useSelector((state) => state.userReducer);
    const [Opening, setOpening] = useState(false);

    const [followingsPopup, setFollowingsPopup] = useState(false);

    //const usersData = useSelector((state) => state.usersReducer);



    return (
        <Modal open={!Opening} onClick={() => setOpening(Opening)}>
            <span
                onClick={() => setOpening(!Opening)}
                className="followers__modal__close"
            ></span>
            <header className="followers__modal__header">
                <button
                    className="followers active-followers"
                >
                    Mes Abonnés
                </button>
            </header>

            {/**Les personnes suivis par l'utilsateur */}
            {!followingsPopup && (
                <>
                    <div className="followers__modal__content">
                        <ul>
                            {userData.followings
                                ? userData.followings.map((user) => {
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
            {/**Les personnes abonnés à l'utilsateur */}

        </Modal>
    );
};

export default FollowingPopup;
