import React from 'react';

const NavIcon = (props) => {
    return (
        <div className='header__user'>
            {props.children}
        </div>
    );
};

export default NavIcon;