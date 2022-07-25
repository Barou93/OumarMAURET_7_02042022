import React from 'react';
import { Link } from 'react-router-dom';
import NotificationsItems from './NotificationsItems';
import User from ".././style/assets/img/user_8.jpg";
import NewUser from ".././style/assets/img/user_1.jpg";


const Notifications = () => {
    return (

        <NotificationsItems>
            <div className="notifications">
                <div className="notifications__title">
                    <h1>Notifications</h1>
                </div>
                <ul className="notifications__list">
                    <li>
                        <Link to="/notifications:id" className="notifications__list__infos">
                            <img src={NewUser} alt="user notifcations" className="notifications__list__picture" />
                            <p>Sidi M Diarra a aimé votre publication Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Doloremque quos, fugit provident.</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/notifications:id" className="notifications__list__infos">
                            <img src={User} alt="user notifcations" className="notifications__list__picture" />
                            <p>Amadou Maiga  aimé votre publication Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Doloremque quos, fugit provident</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </NotificationsItems>

    );
};

export default Notifications;