import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { dateFromNow, isEmpty } from '../Utils';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import PostComments from './PostComments';
import LigthBox from '../Log/Ligthbox';

const PostPictureModal = ({ post }) => {
    const [openPicture, setOpenPicture] = useState(false);
    const [openComment, setOpenComment] = useState(false)
    const usersData = useSelector((state) => state.usersReducer)
    return (

        <LigthBox open={!openPicture}
            onClick={() => setOpenPicture(openPicture)}>
            <div className="lightbox__container__img">
                <img src={post.attachment}
                    alt="user post" />
            </div>
            <div className="lightbox__container__content">
                <header className="card__header card__header-avatar">
                    <Link to={`/${post.UserId}`}>
                        <img src={!isEmpty(usersData[0]) &&
                            usersData.map((user) => {
                                if (user.id === post.UserId) return user.picture
                                return null;
                            }).join('')}
                            className="card__avatar"
                            alt="user post" />
                    </Link>
                    <Link
                        className='card__title'
                        to={`/${post.UserId}`}>
                        {
                            !isEmpty(usersData[0]) &&
                            usersData.map((user) => {
                                if (user.id === post.UserId) return user.firstname + " " + user.lastname
                                return null;
                            }

                            ).join('')
                        }
                    </Link>
                    <div className="card__time">
                        {dateFromNow(post.createdAt)}
                    </div>
                    <span
                        className="card__options post_options"></span>


                </header>
                <div className="card__body">
                    <div className="card__content">
                        <p>
                            {post.content}
                        </p>
                    </div>
                </div>
                <div className="card__reaction">
                    <span className="card__likereaction">
                        {post.Likes ? post.Likes.length : ""}
                    </span>

                    <span
                        className="card__commentslength"
                        onClick={() => setOpenComment(!openComment)}
                    >
                        {post.Comments ? post.Comments.length : " "} commentaire{post.Comments.length > 1 ? "s" : null}
                    </span>

                </div>
                <div className="card__interactions">
                    <div className="card__like">
                        <LikeButton post={post} />
                    </div>

                    <div

                        className="card__comments">
                        <span className="card__comments__btn"
                            onClick={() => setOpenComment(!openComment)}
                        ></span>
                        <span>
                            {post.Comments ? post.Comments.length : " "} commentaire{post.Comments.length > 1 ? "s" : null}
                        </span>
                    </div>
                </div>
                {openComment && <PostComments post={post} />}
            </div>
        </LigthBox>

    );
};

export default PostPictureModal;