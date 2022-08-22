import React, { useContext } from 'react';

import { UidContext } from '../Components/AppContext';

import SigninForm from '../Components/Log/SigninForm';

import ProfilItem from '../Profil/ProfilItem';
const Profil = () => {
    const uid = useContext(UidContext);

    return (
        <div>

            {uid ? (
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