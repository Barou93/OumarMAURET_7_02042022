import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComments } from '../../actions/post.actions';

import { UidContext } from '../AppContext';

import { dateFromNow } from '../Utils';

const EditComment = ({ comment, postId }) => {
    const [editComment, setEditComment] = useState(true);
    const [isAuthor, setIsAuthor] = useState(false);
    const [updateComment, setUpdateComment] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    const [text, setText] = useState("");
    const uid = useContext(UidContext);
    const dispatch = useDispatch();



    const handleEdit = (e) => {
        e.preventDefault();

        if (text) {

            dispatch(editComments(postId, comment.id, userData.id, text))
            setText("");
            setUpdateComment(false)

        }

    }

    //Delete Comment
    const handleDelete = () => dispatch(deleteComment(postId, comment.id, userData.id))

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.userId) {
                setIsAuthor(true);
            }
        }
        checkAuthor();


    }, [uid, comment.userId])
    return (
        <>
            <div className="comment__message">
                <div className="comment__message__container">
                    <a href='#comments' className="comment__message__name">
                        {usersData.map((user) => {
                            if (user.id === comment.userId) return user.firstname + " " + user.lastname
                            else return null
                        })}
                    </a>

                    {updateComment === false && (
                        <p className='comment__message__content'>
                            {comment.comments}
                        </p>
                    )}

                    {isAuthor && updateComment && (
                        <>
                            <textarea

                                defaultValue={comment.comments}
                                onChange={(e) => setText(e.target.value)}
                                className='comment__message__content update__comment' />
                            <div className="comment__btn__container">
                                <button
                                    onClick={handleEdit}
                                    className={text === comment.comments ? "comment__cancel__btn no-data" : "comment__update__btn"}
                                >
                                    Enregistrer
                                </button>
                                <button
                                    className='comment__cancel__btn'
                                    onClick={() => setUpdateComment(false)}
                                >
                                    Annuler
                                </button>
                            </div>
                        </>
                    )}

                </div>
                <div className="comment__message__infos">
                    <span>
                        {dateFromNow(comment.updatedAt)}
                    </span>

                    <a
                        onClick={() => setEditComment(!editComment)}
                        href="#edit" className='edit__comment'>
                    </a>
                    {isAuthor && editComment === false && (
                        <div className="edit__comment__container">
                            <a
                                onClick={() => { setUpdateComment(!updateComment); setEditComment(!editComment) }}
                                href="#post"
                                className="edit__comment__content"
                            >Modifier</a>

                            <a
                                onClick={() => {
                                    if (window.confirm('Voulez-vous supprimer ce commentaire ?')) {
                                        handleDelete();
                                    }
                                }}
                                href="#post" className="edit__comment__delete__comment">Supprimer</a>
                        </div>
                    )}


                </div>
            </div>

        </>
    );
};

export default EditComment;