import React, { useContext } from 'react';

import { UidContext } from '../Components/AppContext';
import SigninForm from '../Components/Log/SigninForm';
const Profil = () => {
    const uid = useContext(UidContext);
    return (
        <div>

            {uid ? (
                <h1>Profil</h1>
            ) : (
                <SigninForm />
            )}
        </div>
    );
};

export default Profil;