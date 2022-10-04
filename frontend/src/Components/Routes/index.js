import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Error from '../../Pages/Error';
import Forum from '../../Pages/Forum';
import Home from '../../Pages/Home';
import Message from '../../Pages/Message';
import Profil from '../../Pages/Profil';
import ConfirmReset from '../Log/ConfirmReset';
import ResetForm from '../Log/ResetForm';
import SigninForm from '../Log/SigninForm';
import SignupForm from '../Log/SignupForm';
import Navbar from "../../Navigations/Navbar";
import NavItem from "../../Navigations/NavItem";
import Logout from '../Log/Logout';
import Activites from '../Post/Activites';
import Follower from '../../Profil/Follower';
import Following from '../../Profil/Following';
import Tabs from '../Tabs';

const index = () => {

    return (

        <Router>
            <Navbar>
                <NavItem />
            </Navbar>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/:id' element={<Profil />} />
                <Route path='/activites' element={<Activites />} />
                <Route path='/followers' element={<Follower />} />
                <Route path='/abonnements' element={<Following />} />
                <Route path='/messages' element={<Message />} />
                <Route path='/forums' element={<Forum />} />
                <Route path='/login' element={<SigninForm />} />
                <Route path='/register' element={<SignupForm />} />
                <Route path='/forgot-password' element={<ResetForm />} />
                <Route path='/success' element={<ConfirmReset />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='*' element={<Error />} />
            </Routes>


        </Router >


    );
};

export default index;