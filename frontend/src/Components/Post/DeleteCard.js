import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';



const DeleteCard = (props) => {
    const dispatch = useDispatch();
    const deleteQuote = () => {
        dispatch(deletePost(props.id))
    }

    return (
        <div onClick={() => {
            if (window.confirm('Voulez-vous supprimer cette publication ?')) {
                deleteQuote()
            }
        }}>
            <span className="delete__post">Supprimer la publication</span>
        </div>
    );
};

export default DeleteCard;