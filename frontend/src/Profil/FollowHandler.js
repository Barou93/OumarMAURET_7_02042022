import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../actions/user.actions';
import { isEmpty } from '../Components/Utils';

const FollowHandler = ({ followerId, type }) => {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(true);
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

        if (!isEmpty(userData.followings)) {
            const users = userData.followings.map((user) => user.id);

            if (users.includes(followerId)) {
                setIsFollowed(true);
            } else {
                setIsFollowed(false);
            }
        }


    }, [userData, followerId])




    return (
        <>
            {isFollowed && !isEmpty(userData) && (
                <>
                    {type === "suggestion" && <button
                        onClick={handleUnFollow}
                        className="followers__modal__followers__btn">Abonné</button>}
                    {type === "card" && <button
                        onClick={handleUnFollow}
                        className="card__followingBtn">Suvi</button>}
                </>
            )
            }

            {!isFollowed && !isEmpty(userData) && (
                <>
                    {type === "suggestion" && <button
                        onClick={handleFollow}
                        className="followers__modal__followings__btn">Suivre</button>}
                    {type === "card" && <button
                        onClick={handleFollow}
                        className="card__followersBtn">Suivre</button>}
                </>
            )}



        </>

    );
};

export default FollowHandler;


/* <button
    onClick={handleFollow}
    className="followers__modal__followers__btn">Abonné</button>
            ) : (<button
    onClick={handleFollow}
    className="followers__modal__followings__btn">Suivre</button>)} }}*/