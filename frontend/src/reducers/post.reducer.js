import { DELETE_COMMENT, DELETE_POST, EDIT_COMMENT, GET_POSTS, LIKE_POST, UNLIKE_POST, UPDATE_POST } from "../actions/post.actions";

const initialState = {};



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
        case UPDATE_POST:
            return state.map((post) => {
                if (post.id === action.payload.id) {
                    return {
                        ...post,
                        content: action.payload.content
                    }
                } else return post
            })
        case DELETE_POST:
            return state.filter((post) => post.id !== action.payload.id);

        case EDIT_COMMENT:
            return state.map((post) => post.id === action.payload.postId ? {
                ...post,
                Comments: post.Comments.map((comment) => comment.id === action.payload.id && comment.userId === action.payload.userId ? {
                    ...comment,
                    comments: action.payload.comments

                } : comment)

            } : post);
        case DELETE_COMMENT:
            return state.map((post) => post.id === action.payload.postId ? {
                ...post,
                Comments: post.Comments.filter((comment) => comment.id !== action.payload.id)

            } : post)


        default:
            return state
    }

}

