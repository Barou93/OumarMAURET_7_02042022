import React from 'react';
import NoFollowing from '.././style/assets/icons/nofollow.png';

const NoFollow = () => {
    return (
        <div className="nofollower__container">
            <div className="nofollower__img">
                <img src={NoFollowing} alt="user-nofollow" />
            </div>
            <div className="nofollower__text">
                <h2>Vous ne suivez personne pour le moment</h2>
            </div>
        </div>
    );
};

export default NoFollow;