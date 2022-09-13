import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.actions';
import Card from './Post/Card';
import NewPostForm from './Post/NewPostForm';
import { isEmpty } from './Utils';

const Feed = () => {
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(3);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1
            > document.scrollingElement.scrollHeight) {
            setLoadPost(true)
        }
    }

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts(count));
            setLoadPost(false);
            setCount(count + 3)
        }
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);

    }, [loadPost, count, dispatch])
    return (
        <>
            <main className="main">

                <NewPostForm />
                {!isEmpty(posts[0]) &&
                    posts.map((post) => {
                        return <Card post={post} key={post.id} />
                    })
                }
            </main>
        </>
    );
};

export default Feed;