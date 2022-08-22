import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FollowHandler from '../../Profil/FollowHandler';
import { dateParse, isEmpty } from '../Utils';
import LikeButton from './LikeButton';

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);

    }, [usersData])


    return (
        <div>
            {isLoading ? (
                <li key={post.id}>
                    <i className='fas fa-spinner fa-spin'></i>
                </li>
            ) : (
                <>
                    <main className="main">
                        <article className="card">
                            <header className="card__header card__header-avatar">
                                <a href="profil/id">
                                    <img src={
                                        !isEmpty(usersData[0]) &&
                                        usersData.map((user) => {
                                            if (user.id === post.UserId) return user.picture
                                            return null;
                                        }).join('')

                                    }
                                        alt="profil utilisateur sur le post" className="card__avatar" />
                                </a>
                                <div className="card__infos">
                                    <a href="/profil/" className="card__title">
                                        {
                                            !isEmpty(usersData[0]) &&
                                            usersData.map((user) => {
                                                if (user.id === post.UserId) return user.firstname + " " + user.lastname
                                                return null;
                                            }

                                            ).join('')


                                        }

                                    </a>
                                    <div className="card__time">
                                        {dateParse(post.createdAt)}
                                    </div>
                                </div>
                                {post.UserId !== userData.id && <FollowHandler followerId={post.UserId} type={"card"} />}
                                <span id='options' className="card__options post_options"></span>
                            </header>
                            <div className="card__body">
                                <div className="card__content">
                                    <p>{post.content} </p>
                                </div>
                                <div className="card__img">
                                    <a href="/post/img">

                                        {post.attachment && (
                                            <img src={post.attachment} alt="user post"
                                                className="fullwidth" />
                                        )}
                                    </a>
                                </div>
                                <div className="card__reaction">
                                    <span className="card__likereaction">
                                        {post.likes ? post.likes.length : ""}
                                    </span>
                                    <span className="card__commentslength">
                                        {post.comments ? post.comments.length : " "}
                                    </span>
                                </div>
                                <div className="card__interactions">
                                    <a href="/likes" onClick={(e) => {
                                        e.preventDefault()
                                    }} className="card__like">
                                        <LikeButton post={post} />
                                    </a>

                                    <a href="#comments"
                                        onClick={(e) => {
                                            e.preventDefault()
                                        }}

                                        className="card__comments">
                                        <span className="card__comments__btn"></span>
                                        <span>
                                            {post.comments ? post.comments.length : 0 + " " + "commentaires"}
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </article>
                    </main>
                </>
            )}
        </div>
    );
};

export default Card;