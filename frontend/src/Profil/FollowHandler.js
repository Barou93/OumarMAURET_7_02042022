import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../actions/user.actions';
import { isEmpty } from '../Components/Utils';

const FollowHandler = ({ followerId, type }) => {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);

    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(followUser(userData.id, followerId));
        setIsFollowed(true);
    }

    const handleUnFollow = () => {
        dispatch(unFollowUser(userData.id, followerId));
        setIsFollowed(false);
    }

    useEffect(() => {
        if (!isEmpty(userData.following)) {
            const follower = userData.following.map((user) => user.followerId);

            if (follower.includes(followerId)) {
                setIsFollowed(true);
            }
        }


    }, [userData, followerId])

    //console.log(isFollowed)

    return (
        <>
            {isFollowed && !isEmpty(userData) && (
                <>
                    {type === "suggestion" && <button
                        onClick={handleUnFollow}
                        className="followers__modal__followers__btn">Suivi</button>}
                    {type === "card" && <div className='follow__btn__container'>
                        <button
                            onClick={handleUnFollow}
                            className="card__followingBtn">Suivi</button>

                    </div>}
                    {type === "profile" && <button
                        onClick={handleUnFollow}
                        className="profile__container__user__edit__profile followed_btn">
                        Suivi
                    </button>}
                </>


            )
            }
            {isFollowed === false && !isEmpty(userData) && (
                <>
                    {type === "suggestion" && <button
                        onClick={handleFollow}
                        className="aside__followers__follow">Suivre</button>}
                    {type === "card" &&
                        <div className='follow__btn__container'>
                            <button
                                onClick={handleFollow}
                                className="card__followersBtn">Suivre</button>
                        </div>}

                    {type === "profile" && <button
                        onClick={handleFollow}
                        className="profile__container__user__edit__profile follow_btn">
                        Suivre
                    </button>}
                </>

            )}



        </>

    );
};

export default FollowHandler;


/*<>
                  <button class="profile__container__user__edit__profile follow_btn">
            Suivre
          </button>
          <button class="profile__container__user__edit__profile followed_btn">
            Abonné
          </button>
                
                
                */