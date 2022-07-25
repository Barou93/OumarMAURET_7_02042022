import React from 'react';

const NotificationsItems = (props) => {
    return (
        <div className='header__dropdown notifications__dropdown'>
            {props.children}
        </div>
    );
};

export default NotificationsItems;