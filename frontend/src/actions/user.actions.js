import axios from 'axios';
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const getUser = (id) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch(err => console.log(err))
    }
}

export const uploadPicture = (data, id) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/user/${id}/upload`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                    .then((res) => {
                        dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture })
                    })
            }).catch(err => console.log(err))

    }

}

export const updateBio = (userId, bio) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { bio }
        })
            .then((res) => {
                dispatch({ type: UPDATE_BIO, payload: bio })
            })
            .catch((err) => console.log(err))
    }
}

export const followUser = (followerId, followingId) => {

    return (dispatch) => {

        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/user/follow/${followerId}`,
            data: { followerId: followingId },
            withCredentials: true
        })
            .then((res) => {

                dispatch({ type: FOLLOW_USER, payload: { followerId } })
            })
            .catch((err) => console.log(err))
    }
}

export const unFollowUser = (followingId, followerId) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
            data: { followerId: followingId }
        })
            .then((res) => {

                dispatch({ type: UNFOLLOW_USER, payload: { followerId } })
            })
            .catch((err) => console.log(err))
    }
}