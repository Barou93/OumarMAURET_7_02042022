import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from '../Utils';
import Feed from '../Feed'


import Card from './Card';
import NewPostForm from './NewPostForm';
import { useParams } from 'react-router-dom';
import { UidContext } from '../AppContext';

const Activites = () => {
    const posts = useSelector((state) => state.postReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const { id: userId } = useParams();
    //const user = usersData.map((user) => user);
    const uid = useContext(UidContext);



    return (
        <div>


            <div className="main profile__content__main">

                {userId === uid ? <NewPostForm /> : null}

                {!isEmpty(posts[0]) &&
                    !isEmpty(usersData[0]) &&
                    posts.map((post) => {
                        for (let i = 0; i < usersData.length; i++) {
                            if (post.UserId === usersData[i].id && userId === usersData[i].id && userId === post.UserId) {
                                return <Card post={post} key={post.id} />

                            }
                        }
                        return null
                    })
                }
            </div>




        </div>
    );
};

export default Activites;

/**<main className="main profile__content__main">
                <NewPostForm />
                {!isEmpty(posts[0]) &&
                    posts.map((post) => {
                        if (post.UserId === userData.id) {
                            return <Card post={post} key={post.id} />
                        }
                        return null
                    })
                }
            </main> */