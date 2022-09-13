import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditProfil from "./EditProfil";
import UpdateBio from "./UpdateBio";
import UpdateImg from "./UpdateImg";
import CoverImg from '.././style/assets/img/groupomania-default-cover-picture.svg';
import { dateFromNow, isEmpty } from "../Components/Utils";

import FollowerPopup from "./FollowerPopup";
import FollowingPopup from "./FollowingPopup";
import { useParams } from "react-router-dom";

const ProfilItem = () => {
    //const userData = useSelector((state) => state.userReducer);
    const { id: userId } = useParams();
    const usersData = useSelector((state) => state.usersReducer);
    const [openFollowerModal, setOpenFollowerModal] = useState(false);
    const [openFollowingModal, setOpenFollowingModal] = useState(false);


    return (
        <>
            {usersData.map((user) => {
                if (user.id === userId) {

                    return (
                        <div className="profile__container">
                            <div className="profile__container__user">
                                <div className="profile__container__user__cover">
                                    <img
                                        src={CoverImg}
                                        alt="cover user"
                                        className="profile__container__user__cover__picture"
                                    />
                                </div>
                                <div className="profile__container__user__infos">
                                    <div className="profile__container__user__picture">
                                        <img
                                            src={user.picture}
                                            alt="user profile"
                                            className="profile__container__user__avatar"
                                        />
                                        <UpdateImg />
                                    </div>
                                    <div className="profile__container__user__title">
                                        <p>
                                            {user.firstname + " " + user.lastname}
                                        </p>

                                        <div className="profile__container__user__follow">

                                            <div className="followers">
                                                <a href="/followers" onClick={(e) => { e.preventDefault(); setOpenFollowerModal(!openFollowerModal) }} className="profile__username">
                                                    {user.followers ? user.followers.length : 0} abonnements
                                                    {openFollowerModal ? <FollowerPopup /> : null}
                                                </a>
                                                <a href="/followings" onClick={(e) => { e.preventDefault(); setOpenFollowingModal(!openFollowingModal) }} className="profile__username">
                                                    {user.followings ? user.followings.length : 0} abonnés
                                                    {openFollowingModal ? <FollowingPopup /> : null}
                                                </a>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="profile__container__user__edit__icon">
                                        <EditProfil />
                                    </div>
                                    <div className="members-date">
                                        <h2>Membre depuis le : {dateFromNow(user.createdAt)} </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="profile__content">
                                <UpdateBio />
                            </div>
                        </div>

                    )
                }
                return null;

            })
            }

        </>

    );
};

export default ProfilItem;
