import React, { useContext } from 'react';
import { UidContext } from '../Components/AppContext';
import Feed from '../Components/Feed';
import SigninForm from '../Components/Log/SigninForm';

import FriendsHint from '../Components/Post/FriendsHint';
import Sidebar from '../Components/Post/Sidebar';


const Home = () => {
    const uid = useContext(UidContext);
    return (
        <div>
            {uid ? (
                <div className="container contain">
                    <Sidebar />
                    <Feed />
                    <FriendsHint />
                </div>
            ) :
                <SigninForm />
            }

        </div>
    );
};

export default Home;