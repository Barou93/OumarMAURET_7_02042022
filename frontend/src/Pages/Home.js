import React from 'react';
import Feed from '../Components/Feed';
import Aside from '../Components/Post/Aside';
import Sidebar from '../Components/Post/Sidebar';


const Home = () => {
    return (
        <div>
            <div className="container contain">
                <Sidebar />
                <Feed />
                <Aside />
            </div>

        </div>
    );
};

export default Home;