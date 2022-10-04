import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditProfil from "./EditProfil";
import UpdateBio from "./UpdateBio";
import UpdateImg from "./UpdateImg";
import { dateFromNow, isEmpty } from "../Components/Utils";

import { Link, NavLink } from "react-router-dom";

import Follower from "./Follower";
import Following from "./Following";
import { useParams } from "react-router-dom";
import { UidContext } from "../Components/AppContext";
import FollowHandler from "./FollowHandler";
import UpdateCoverPicture from "./UpdateCoverPicture";
import Activites from "../Components/Post/Activites";
import Tabs from "../Components/Tabs";

import TabContainer from "../Components/TabContainer";
import NoFollow from "./NoFollow";


const ProfilItem = () => {
    //const userData = useSelector((state) => state.userReducer);
    const { id: userId } = useParams();
    const usersData = useSelector((state) => state.usersReducer);
    //const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);
    const [openFollower, setOpenFollower] = useState(false);
    const [openFollowing, setOpenFollowing] = useState(false);
    const [openActivity, setOpenActivity] = useState(false);
    const [loading, setLoading] = useState(true);

    const [toggleState, setToggleState] = useState(1);

    const posts = useSelector((state) => state.postReducer);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    console.log(toggleState)


    useEffect(() => {
        !isEmpty(usersData[0]) && setLoading(false);
    }, [usersData])
    return (
        <div>
            {loading ? (
                <li>
                    <i className="fas fa-spinner fa-spin"></i>
                </li>
            ) : (<>
                {userId ? (

                    usersData.map((user) => {
                        if (user.id === userId) {

                            return (
                                <>
                                    <div key={user.id} className="profile__container">
                                        <div className="profile__container__user">
                                            <div className="profile__container__user__cover">
                                                <img
                                                    src={user.coverPicture}
                                                    alt="cover user"
                                                    className="profile__container__user__cover__picture"
                                                />
                                                {user.id === userData.id ? <UpdateCoverPicture /> : null}
                                            </div>
                                            <div className="profile__container__user__infos">
                                                <div className="profile__container__user__picture">
                                                    <img
                                                        src={user.picture}
                                                        alt="user profile"
                                                        className="profile__container__user__avatar"
                                                    />
                                                    {user.id === userData.id ? <UpdateImg /> : null}
                                                </div>
                                                <div className="profile__container__user__title">
                                                    <p>
                                                        {user.firstname + " " + user.lastname}
                                                    </p>

                                                    <div className="profile__container__user__follow">

                                                        <div className="followers">

                                                            <p>{user.follower ? user.follower.length : 0} abonnés</p>

                                                            <p> {user.following ? user.following.length : 0} abonnements</p>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="profile__container__user__edit__icon">
                                                    {user.id === userData.id ? <EditProfil /> : <FollowHandler followerId={user.id} type={"profile"} />}
                                                </div>
                                                <div className="members-date">
                                                    <h2>Membre depuis le : {dateFromNow(user.createdAt)} </h2>
                                                </div>
                                            </div>
                                            <div className="tabs__container">
                                                <div>
                                                    <button
                                                        className={toggleState === 1 ? "tabs__button active" : "tabs__button"}
                                                        onClick={() => toggleTab(1)}
                                                    >
                                                        Activités
                                                    </button>
                                                    <button
                                                        className={toggleState === 2 ? "tabs__button active" : "tabs__button"}
                                                        onClick={() => toggleTab(2)}
                                                    >
                                                        Followers
                                                    </button>
                                                    <button
                                                        className={toggleState === 3 ? "tabs__button active" : "tabs__button"}
                                                        onClick={() => toggleTab(3)}
                                                    >
                                                        Abonnements
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="profile__content">

                                            <UpdateBio />
                                            <div className="post">
                                                <h2>Vos publications récentes</h2>
                                                <div className="post__container">
                                                    {!isEmpty(posts[0]) &&
                                                        posts.map((post) => {
                                                            if (post.UserId === user.id) {
                                                                return (
                                                                    <a href="#post">
                                                                        <img src={post.attachment} alt="post content"
                                                                            className="post__container__picture" />
                                                                    </a>
                                                                )
                                                            }
                                                            return null
                                                        })

                                                    }
                                                </div>
                                            </div>

                                            <div>
                                                <div className={toggleState === 1 ? "content  active-content content-transparent" : "content"}>
                                                    <Activites />
                                                </div>

                                                <div
                                                    className={toggleState === 2 ? "content  active-content follow-content" : "content"}
                                                >
                                                    {user.follower && user.follower.length > 0 ? <Follower /> : <NoFollow />}

                                                </div>

                                                <div
                                                    className={toggleState === 3 ? "content  active-content follow-content" : "content"}
                                                >
                                                    {user.follower && user.follower.length > 0 ? <Following /> : <NoFollow />}

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </>

                            )
                        }
                        return null;

                    })) : null
                }

            </>)
            }
        </div >

    );
};

export default ProfilItem;


