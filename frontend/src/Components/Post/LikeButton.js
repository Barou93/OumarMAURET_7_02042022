import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/post.actions';
import { UidContext } from '../AppContext';


const LikeButton = ({ post }) => {
    const [isLiked, setIsLiked] = useState(false);

    const uid = useContext(UidContext);

    const dispatch = useDispatch();

    const handleLike = () => {
        dispatch(likePost(post.id, uid));
        setIsLiked(true);
    }

    const handleUnLike = () => {
        dispatch(unlikePost(post.id, uid));
        setIsLiked(false);
    }

    useEffect(() => {
        const likes = post.Likes.map((like) => like.userId)
        if (likes.includes(uid)) {
            setIsLiked(true);
        }
    }, [uid, post.Likes, isLiked]);

    return (
        <>
            {uid && isLiked === false && (
                <>
                    <span onClick={handleLike} className="card__like__heart__light">

                    </span>
                    <span className="card__like__length">
                        {post.Likes.length + " " + "j'adore"}
                    </span>
                </>
            )
            }
            {
                uid && isLiked === true && (
                    <>
                        <span
                            onClick={handleUnLike}
                            className="card__like__heart__full"
                        >
                        </span>
                        <span className="card__like__length liked">
                            {post.Likes.length + " " + "j'adore"} </span>
                    </>
                )
            }
        </>
    );
};

export default LikeButton;