import React, { useContext } from 'react';

import { useParams } from 'react-router-dom';


import { UidContext } from '../Components/AppContext';

import SigninForm from '../Components/Log/SigninForm';

import ProfilItem from '../Profil/ProfilItem';
const Profil = () => {
    const uid = useContext(UidContext);
    const { id: userId } = useParams();
    console.log(userId)


    return (
        <div>

            {userId || uid ? (
                <>
                    <ProfilItem />
                </>
            ) : (
                <SigninForm />
            )}
        </div>
    );
};

export default Profil;