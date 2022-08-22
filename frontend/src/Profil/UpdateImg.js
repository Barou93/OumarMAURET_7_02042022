import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../actions/user.actions';
import Modal from '../Components/Log/Modals';

/**
 * @params(type)
 * @returns 
 */

const UpdateImg = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState();
    const [image, setImage] = useState('');
    const [isUpload, setIsUpload] = useState(false);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);


    //Update user Profil Image
    const handlePicture = (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("file", file);

        dispatch(uploadPicture(data, userData.id));
    }

    //Preview Picture
    const handlePicturePreview = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result);
                setIsUpload(true);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        setFile(e.target.files[0])

    }


    return (

        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="profile__container__user__icons" >
                <Modal
                    open={isOpen}>
                    <header className="upload__img__modal__header">
                        <span onClick={() => setIsOpen(false)} className="upload__img__modal__header__close"></span>
                        <h2>Modifier la photo de profil</h2>
                    </header>
                    <div className="upload__img__modal__profil">

                        {!isUpload ?

                            (<img src={userData.picture} alt="user profil" />) :

                            (<img src={image} alt="user profil" />)}
                        <div className="upload__img__modal__content">
                            <form onSubmit={handlePicture} className=" upload_pic">
                                <div className="input__file">
                                    <label htmlFor="file">Modifier l'image</label>
                                    <input type="file"
                                        name="file"
                                        id="file"
                                        className="input-file"
                                        accept=".jpeg,  .jpg,  .png"
                                        onChange={handlePicturePreview}
                                    />
                                </div>
                                <div className="edit__modal__form__submit">
                                    <input type="submit"
                                        value="Changer l'image"
                                        className=' edit__modal__form__submit__validatebtn' />
                                    <button onClick={() => setIsOpen(false)}
                                        className="edit__modal__form__submit__cancel__edit">Annuler</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </Modal >
            </button>

        </>




    );
};

export default UpdateImg;