import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getPosts } from '../../actions/post.actions';
import { isEmpty } from '../Utils';
import EditComment from './EditComment';

const PostComments = ({ post }) => {
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState("");


    const handleComment = (e) => {
        e.preventDefault();
        if (commentText) {
            dispatch(addComment(post.id, userData.id, commentText))
                .then(() => dispatch(getPosts()))
                .then(() => setCommentText(''));
        }

    }
    return (
        <footer className='card__footer'>
            {post.Comments.map((comment) => {
                return (
                    <div className="card__comments__allcomments" key={comment.id}>
                        <a href="#usercomments">
                            <img src={!isEmpty(usersData[0]) && usersData
                                .map((user) => {
                                    if (user.id === comment.userId) return user.picture
                                    else return null
                                }).join('')
                            } alt=" profil utilisateur en commentaires"
                                className="card__comments__user" />
                        </a>
                        <EditComment comment={comment} postId={post.id} />

                    </div>
                )
            })}
            {userData.id && (
                <div className="card__comments__newcomment">
                    <a href="#usercomments">
                        <img src={userData.picture} alt=" utilisateur creation commentaire"
                            className="card__comments__user" />
                    </a>
                    <form className='comment__form' onSubmit={handleComment}>
                        <input
                            onChange={(e) => setCommentText(e.target.value)}
                            value={commentText}
                            type="text" className="card__comments__input" placeholder="Écrire un commentaire..." />
                        <br />
                        <input className='comment__form__submit' type="submit" value="Publier" />
                    </form>
                </div>
            )}
        </footer>
    );
};

export default PostComments;