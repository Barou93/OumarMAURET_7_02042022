import React from 'react';
import Feed from '../Components/Feed';
import Sidebar from '../Components/Post/Sidebar';


const Home = () => {
    return (
        <div>
            <div className="container contain">
                <Sidebar />
                <Feed />
            </div>

        </div>
    );
};

export default Home;