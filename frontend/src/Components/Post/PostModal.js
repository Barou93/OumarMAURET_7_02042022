import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Modal from '../Log/Modals';
import { addPost, getPosts } from '../../actions/post.actions';



const PostModal = ({ post }) => {
    const userData = useSelector((state) => state.userReducer);
    const [postText, setPostText] = useState("");

    const [postFile, setPostFile] = useState();
    const [postImg, setPostImg] = useState("");
    const [createPost, setCreatePost] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    const previewPostImg = (e) => {
        const isRead = new FileReader();
        isRead.onload = () => {
            if (isRead.readyState === 2) {
                setPostImg(isRead.result);
                setIsLoaded(true);
            }
        }

        isRead.readAsDataURL(e.target.files[0]);
        setPostFile(e.target.files[0])
    }

    const handlePost = async () => {
        if (postText || postImg) {
            const data = new FormData();
            data.append('UserId', userData.id);

            if (postText) data.append('content', postText);

            //Vérify if file content a file picture 
            if (postFile) data.append('file', postFile)

            await dispatch(addPost(data));
            dispatch(getPosts())
            setCreatePost(!createPost)
            cancelPost();
        }


    }

    const cancelPost = () => {
        setPostText("");
        setPostImg("");
    }

    console.log(isLoaded)
    //console.log(postImg)
    return (

        <Modal open={!createPost}
            onClick={() => setCreatePost(createPost)}>
            <div className='div-over'>
                <div className='wrapper__container'>
                    <header className="main__post__modal__header">
                        <h2>Créer une publication</h2>
                        <span
                            onClick={() => {
                                setCreatePost(!createPost);
                                cancelPost()

                            }}
                            className="main__post__modal__closebtn"></span>
                    </header>
                    <div className="main__post__modal__userinfos">
                        <NavLink exact to={`/profil/${userData.id}`}>
                            <img src={userData.picture} alt="l'utilisateur qui va créer un post"
                                className="username" />
                        </NavLink>
                        <p>{`${userData.firstname}${" "}${userData.lastname}`} </p>
                    </div>

                    <div className="main__post__modal__content">
                        <div
                            onInput={(e) => setPostText(e.currentTarget.textContent)}
                            className="main__post__content__usertext" data-gramm="false"
                            contenteditable="true" placeholder={`De quoi souhaitez-vous discuter ?${" "}${userData.firstname}`}
                            aria-placeholder={`De quoi souhaitez-vous discuter ?${" "}${userData.firstname}`}
                            aria-label="Éditeur de texte pour créer du contenu"
                            role="textbox" aria-multiline="true"
                            data-test-ql-editor-contenteditable="true">
                        </div>

                        {isLoaded ? (
                            <div className='main__post__modal__img'>

                                <img
                                    src={postImg}
                                    alt={`post modal de ${userData.firstname}`}
                                />
                                <div
                                    onClick={() => setIsLoaded(!isLoaded)}
                                    className="main__post__modal__img__closebtn">
                                    <span className="main__post__modal__img__close"></span>
                                </div>
                            </div>

                        ) : null}


                    </div>

                </div>

            </div>
            <footer className="main__post__modal__attachment">
                <div className="main__post__modal__attachment__addcontainer">
                    <div className="main__post__modal__attachment__addtitle">
                        Ajouter à votre publication
                    </div>
                    <div className="main__post__modal__attachment__addmedia">
                        <input type="file"
                            name="file"
                            id="file-upload"
                            accept=' .jpg, .jpeg, .png'
                            className='file_post new__post'
                            onChange={previewPostImg}

                        />
                    </div>
                </div>
                <div className="main__post__modal__button">

                    <button
                        onClick={handlePost}
                        className={postText || postImg ? "main__post__modal__attachment__postbtn active" : "main__post__modal__attachment__postbtn"}
                    >
                        Publier
                    </button>

                </div>

            </footer>
        </Modal >
    );
};

export default PostModal;