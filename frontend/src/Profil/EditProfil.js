import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Components/Log/Modals';
import CoverImg from '.././style/assets/img/groupomania-default-cover-picture.svg';
import { updateBio, uploadPicture } from '../actions/user.actions';
//import User from ".././style/assets/img/user_8.jpg";

const EditProfil = () => {

    const [showing, setShowing] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [file, setFile] = useState();
    const [bioContent, setBioContent] = useState('');
    //const [isUpdate, setIsUpdate] = useState(false);
    const [upload, setUpload] = useState(false);

    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    //Update bio value
    const handleUpdateProfil = () => {

        if (bioContent === "") {
            setBioContent(userData.bio)
        } else {
            dispatch(updateBio(userData.id, bioContent));
        }
        updatePicture();

    }

    const updatePicture = () => {

        const data = new FormData();
        data.append('file', file);

        dispatch(uploadPicture(data, userData.id));
    }

    const handlePreviewImage = (e) => {

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result);

                setUpload(true)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        setFile(e.target.files[0]);
    }



    return (
        <>
            <button
                onClick={() => setShowing(!showing)}
                className="profile__container__user__edit__profile">
                Modifier le profil
                <Modal open={showing}>
                    <div className="edit__modal__header">
                        <span
                            onClick={() => setShowing(false)}
                            className="edit__modal__header__closeBtn"></span>
                        <h2>Editer le profil</h2>
                        <button
                            onClick={handleUpdateProfil}
                            className="edit__modal__header__saveBtn">
                            Enregistrer
                        </button>
                    </div>
                    <div className="edit__modal__coverImg">
                        <img src={CoverImg} alt="cover user" />
                        <div className="cover__icons">
                            <label htmlFor="input-file-cover" className="cover__icons__update">
                                < input className='input-file-cover' type="file" name="file" id="input-file-cover" />
                            </label>
                            <div className="cover__icons__delete"></div>
                        </div>
                    </div>
                    <div className="edit__modal__profilImg">
                        {!upload ?

                            (<img src={userData.picture} alt="user profil" />) :

                            (<img src={imagePreview} alt="user profil" />)}
                        <div className="cover__icons__profil">
                            <label htmlFor="input-file-profil" className="cover__icons__update profil">
                            </label>
                            < input type="file"
                                name="file"
                                id="input-file-profil"
                                accept='.jpg, .jpeg, .png'
                                onChange={handlePreviewImage}
                            />
                        </div>
                    </div>
                    <div className="edit__modal__content">
                        <div className="edit__modal__form__input">
                            <div className="label">
                                <label htmlFor="#">Bio</label>
                            </div>
                            <textarea
                                className="edit__modal__form__bio"
                                type="text" defaultValue={userData.bio}
                                onChange={(e) => setBioContent(e.target.value)}
                            >
                            </textarea>
                        </div>
                    </div>
                </Modal>
            </button>
        </>
    );
};

export default EditProfil;