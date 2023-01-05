import axios from 'axios'
import { useEffect, useState } from 'react'

export default function EditComment ({comment}) {

//Initial value for useState for Editing Comment
const commentEdit = {
    userId: comment.userId,
    postId: comment.postId,
    commentText: comment.commentText
}

//useState, with editComment as current state and setEditComment as func to update state
const [editComment, setEditComment] = useState(commentEdit)

    //edit's handleChange w/ text input value updating commentText
    const editHandleChange = (event) => {
        setEditComment({...editComment, ['commentText']: event.target.value})
    }
    
    //edit's handleSubmit to actualize changes
    //runs axios call and updates state
    const editHandleSubmit = (event) => {
    event.preventDefault();
        editComments(editComment)
        setEditComment(commentEdit)
        // window.location.reload()
    }

    //axios call to update
    const editComments = async() => {
        const post = await axios.put(`https://holly-gram-backend-2-production.up.railway.app/comment/${comment.id}/`, editComment)
        console.log(post.data)
        setEditComment(post.data)
    }

    return (
        <div>
                                <form onSubmit={editHandleSubmit}>
                                    <input  
                                        type="text"
                                        onChange={editHandleChange}
                                        value={commentEdit.comment}
                                                                />
        
                                    <button className="button-styling" type="submit">
                                    Edit Comment
                                    </button>
                                </form>
        
                            </div>

        )
}