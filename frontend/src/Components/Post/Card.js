import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updatePost } from '../../actions/post.actions';

import FollowHandler from '../../Profil/FollowHandler';
import { dateFromNow, isEmpty } from '../Utils';
import DeleteCard from './DeleteCard';
import LikeButton from './LikeButton';

import PostComments from './PostComments';
import PostPictureModal from './PostPictureModal';

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsupdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [postOption, setPostOption] = useState(false);
    const [openPostPicture, setOpenPostPicture] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const updateContent = () => {
        if (textUpdate) {
            dispatch(updatePost(post.id, textUpdate))
        }
        setIsupdated(false);

    }

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


                    <article className="card">
                        <header className="card__header card__header-avatar">
                            <Link to={`/${post.UserId}`}>
                                <img src={
                                    !isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if (user.id === post.UserId) return user.picture
                                        return null;
                                    }).join('')

                                }
                                    alt="profil utilisateur sur le post" className="card__avatar" />
                            </Link>
                            <div className="card__infos">
                                <Link to={`/${post.UserId}`} className="card__title">
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
                            </div>
                            {post.UserId !== userData.id && <FollowHandler followerId={post.UserId} type={"card"} />}
                            <span
                                id='options'
                                onClick={() => setPostOption(!postOption)}
                                className="card__options post_options"></span>
                            <>

                                {userData.id === post.UserId && postOption &&
                                    (
                                        <div id="options" className="edit__post__container">
                                            <span

                                                className="edit__post__content"
                                                onClick={() => setIsupdated(!isUpdated)}

                                            >Modifier la publication</span>
                                            <DeleteCard id={post.id} />
                                        </div>
                                    )}
                            </>

                        </header>
                        <div className="card__body">
                            <div className="card__content">
                                {isUpdated === false && <p>{post.content} </p>}
                                {isUpdated &&
                                    (
                                        <>
                                            <textarea
                                                defaultValue={post.content}
                                                onChange={(e) => setTextUpdate(e.target.value)}
                                            />
                                            <button
                                                onClick={updateContent}

                                            >Enregistrer</button>
                                        </>

                                    )

                                }
                            </div>
                            <div className="card__img">
                                <div onClick={() =>
                                    setOpenPostPicture(!openPostPicture)} >

                                    {post.attachment && (
                                        <img

                                            src={post.attachment} alt="user post"
                                            className="fullwidth" />

                                    )}
                                    {openPostPicture && <PostPictureModal post={post} />}
                                </div>
                            </div>
                            <div className="card__reaction">
                                <span className="card__likereaction">
                                    {post.Likes ? post.Likes.length : ""}
                                </span>
                                <span
                                    onClick={() => setShowComments(!showComments)}
                                    className="card__commentslength">
                                    {post.Comments ? post.Comments.length : " "} commentaire{post.Comments.length > 1 ? "s" : null}
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
                                        e.preventDefault();
                                        setShowComments(!showComments)
                                    }}

                                    className="card__comments">
                                    <span className="card__comments__btn"></span>
                                    <span>
                                        {post.Comments ? post.Comments.length : " "} commentaire{post.Comments.length > 1 ? "s" : null}
                                    </span>
                                </a>
                            </div>
                            {showComments && <PostComments post={post} />}
                        </div>
                    </article>

                </>
            )}
        </div>
    );
};

export default Card;