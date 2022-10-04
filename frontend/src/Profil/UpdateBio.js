import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateBio } from '../actions/user.actions';

const UpdateBio = () => {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const { id: userId } = useParams();
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();

    const handleUpdate = () => {
        dispatch(updateBio(userData.id, bio));
        setUpdateForm(false);

    }
    return (
        <>
            <div className="sidebar profile__content__userbio">
                <h2>A propos</h2>
                {usersData ? (usersData.map((user) => {
                    if (user.id === userId) {
                        return (
                            <>
                                {
                                    updateForm === false && (
                                        <>
                                            <p>{user.bio}</p>
                                            {user.id === userData.id ?
                                                <button
                                                    onClick={() => setUpdateForm(!updateForm)}
                                                    className="profile__content__userbio__edit__bio">
                                                    Modifier votre bio
                                                </button>
                                                : null

                                            }

                                        </>
                                    )
                                }
                                {
                                    updateForm && (
                                        <>
                                            <textarea
                                                type="text"
                                                className='bio-texterea'
                                                defaultValue={user.bio}
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
                                    )
                                }
                            </>
                        )

                    }
                    return null


                })) : null}


            </div>
        </>
    );
};

export default UpdateBio;