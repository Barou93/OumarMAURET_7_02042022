import { GET_POSTS, LIKE_POST, UNLIKE_POST } from "../actions/post.actions";

const initialState = {


};



export default function postReducers(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;

        case LIKE_POST:
            return state.map((post) => post.id === action.payload.postId ? {
                ...post,
                Likes: [action.payload.Likes, ...post.Likes],

            } : post);

        case UNLIKE_POST:
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post,
                        Likes: post.Likes.filter((id) => id !== action.payload.id),

                    }
                }
                return post
            });

        default:
            return state
    }

}

