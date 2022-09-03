import axios from 'axios';


//All posts feed
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

//Comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

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


                dispatch({ type: UNLIKE_POST, payload: { postId, userId, Likes: res.data } });
            })
            .catch((err) => console.log(err))
    }
}

export const updatePost = (id, content) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
            withCredentials: true,
            data: { content }
        })
            .then((res) => {

                dispatch({ type: UPDATE_POST, payload: { content, id } })

            })
            .catch((err) => console.log(err))
    }

}

export const deletePost = (id) => {
    return (dispatch) => {
        return axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
            withCredentials: true

        })
            .then((res) => {
                dispatch({ type: DELETE_POST, payload: { id } })
            })

    }
}

//Comments Actions

export const addComment = (postId, userId, comments) => {
    return (dispatch) => {
        return axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}/comments`,
            data: { comments, userId },
            withCredentials: true
        })
            .then((res) => {
                dispatch({ type: ADD_COMMENT, payload: { postId } })
            })
            .catch((err) => console.log(err))
    }

}

export const editComments = (postId, id, userId, comments) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}/comments/${id}`,
            data: { comments },
            withCredentials: true,
        })
            .then((res) => {
                dispatch({ type: EDIT_COMMENT, payload: { postId, id, userId, comments } })
            })
            .catch((err) => console.log(err))
    }

};

export const deleteComment = (postId, id, userId) => {
    return (dispatch) => {
        return axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}/comments/${id}`,
            withCredentials: true,
        })
            .then((res) => {
                dispatch({ type: DELETE_COMMENT, payload: { postId, id, userId } })
            })
            .catch((err) => console.log(err))
    }
}
