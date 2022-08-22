import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditProfil from "./EditProfil";
import UpdateBio from "./UpdateBio";
import UpdateImg from "./UpdateImg";
import CoverImg from '.././style/assets/img/groupomania-default-cover-picture.svg';
import { dateParse } from "../Components/Utils";

import FollowerPopup from "./FollowerPopup";
import FollowingPopup from "./FollowingPopup";

const ProfilItem = () => {
    const userData = useSelector((state) => state.userReducer);
    //const usersData = useSelector((state) => state.usersReducer);
    const [openFollowerModal, setOpenFollowerModal] = useState(false);
    const [openFollowingModal, setOpenFollowingModal] = useState(false);




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
                            src={userData.picture}
                            alt="user profile"
                            className="profile__container__user__avatar"
                        />
                        <UpdateImg />
                    </div>
                    <div className="profile__container__user__title">
                        <p>
                            {userData.firstname + " " + userData.lastname}
                        </p>

                        <div className="profile__container__user__follow">

                            <div className="followers">
                                <a href="/followers" onClick={(e) => { e.preventDefault(); setOpenFollowerModal(!openFollowerModal) }} className="profile__username">
                                    {userData.followers ? userData.followers.length : 0} abonnements
                                    {openFollowerModal ? <FollowerPopup /> : null}
                                </a>
                                <a href="/followings" onClick={(e) => { e.preventDefault(); setOpenFollowingModal(!openFollowingModal) }} className="profile__username">
                                    {userData.followings ? userData.followings.length : 0} abonnés
                                    {openFollowingModal ? <FollowingPopup /> : null}
                                </a>
                            </div>

                        </div>
                    </div>
                    <div className="profile__container__user__edit__icon">
                        <EditProfil />
                    </div>
                    <div className="members-date">
                        <h2>Membre depuis le : {dateParse(userData.createdAt)} </h2>
                    </div>
                </div>
            </div>
            <div className="profile__content">
                <UpdateBio />
            </div>
        </div >
    );
};

export default ProfilItem;


/*{/**{userData.followers ? userData.followers.map((user) => {
                                    return (

                                        <img key={user.id}
                                            src={user.picture} alt="abonnés de l'utilisateur"
                                            className="profile__container__user__follow__img" />
                                    )
                                    //return null;

                                }) : null} }*/