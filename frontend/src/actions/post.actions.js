import axios from 'axios';


//All posts feed
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

export const getPosts = (num) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post`)
            .then((res) => {
                const counter = res.data.slice(0, num)
                dispatch({ type: GET_POSTS, payload: counter })
            })
            .catch((err) => console.log(err))
    }

}
//All like 
export const likePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}/like-post`,
            withCredentials: true
        })
            .then((res) => {
                console.log(res);

                dispatch({ type: LIKE_POST, payload: { postId, userId, Likes: res.data } });
            })
            .catch((err) => console.log(err))
    }
}

export const unlikePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}/unlike-post`,
            withCredentials: true
        })
            .then((res) => {
                console.log(res);

                dispatch({ type: UNLIKE_POST, payload: { postId, userId, Likes: res.data } });
            })
            .catch((err) => console.log(err))
    }
}

