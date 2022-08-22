import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBio } from '../actions/user.actions';

const UpdateBio = () => {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleUpdate = () => {
        dispatch(updateBio(userData.id, bio));
        setUpdateForm(false);

    }
    return (
        <>
            <div className="sidebar profile__content__userbio">
                <h2>Intro</h2>
                {updateForm === false && (
                    <>
                        <p>{userData.bio}</p>
                        <button
                            onClick={() => setUpdateForm(!updateForm)}
                            className="profile__content__userbio__edit__bio">
                            Modifier votre bio
                        </button>
                    </>
                )}
                {updateForm && (
                    <>
                        <textarea
                            type="text"
                            className='bio-texterea'
                            defaultValue={userData.bio}
                            onChange={(e) => setBio(e.target.value)}
                        ></textarea>
                        <div className="bio__button">
                            <button
                                onClick={handleUpdate}
                                className="profile__content__userbio__edit__bio bio__button__save-bio">
                                Enregistrer
                            </button>
                            <button
                                onClick={() => setUpdateForm(false)}
                                className="profile__content__userbio__edit__bio bio__button__cancel-bio">
                                Annuler
                            </button>
                        </div>

                    </>
                )}

            </div>
        </>
    );
};

export default UpdateBio;