import React, { useContext } from 'react';
import { UidContext } from '../Components/AppContext';
import Feed from '../Components/Feed';
import SigninForm from '../Components/Log/SigninForm';
import Aside from '../Components/Post/Aside';
import Sidebar from '../Components/Post/Sidebar';


const Home = () => {
    const uid = useContext(UidContext);
    return (
        <div>
            {uid ? (
                <div className="container contain">
                    <Sidebar />
                    <Feed />
                    <Aside />
                </div>
            ) :
                <SigninForm />
            }

        </div>
    );
};

export default Home;