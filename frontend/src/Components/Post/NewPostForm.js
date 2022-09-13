import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostModal from './PostModal';

const NewPostForm = () => {
    const userData = useSelector((state) => state.userReducer);

    const [showPostModal, setShowPostModal] = useState(false);
    const [showPictureModal, setShowPictureModal] = useState(false);


    return (
        <div className='main__post'>
            <Link exact to={`profil/${userData.id}`}>
                <img src={userData.picture}
                    alt="  créer un post"
                    className="main__post__usericon" />
            </Link>
            <button
                onClick={() => setShowPostModal(!showPostModal)}
                className='main__post__text'
            >{`Commencer un post${" "}${userData.firstname}`}</button>
            {showPostModal ? <PostModal /> : null}
            <div
                onClick={() => setShowPictureModal(!showPictureModal)}
                className="main__post__btn_img">
                {showPictureModal ? <PostModal /> : null}
            </div>
        </div>
    );
};

export default NewPostForm;