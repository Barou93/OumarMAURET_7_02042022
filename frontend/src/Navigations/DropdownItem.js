import React from 'react';


const DropdownItem = (props) => {

    return (
        <div className="header__dropdown">
            {props.children}
        </div>

    );
};

export default DropdownItem;