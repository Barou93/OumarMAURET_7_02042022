import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { Link } from 'react-router-dom';

const Logout = () => {
    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, {
                expires: 1
            })

        }
    }
    const handleLogout = async () => {
        await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true
        })
            .then(() => removeCookie('jwt'))
            .catch(err => console.log(err.message));
        window.location = '/'

    }
    return (
        <Link to="/logout" className="icon" onClick={handleLogout}>
            Se déconnecter
        </Link>
    );
};

export default Logout;