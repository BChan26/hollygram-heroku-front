import axios from 'axios'
import { useEffect, useState } from 'react'
import EditComment from './EditComment'

export default function Comment ({user, postId, handlePosts}) {

//Console Logs to Test Destructured Props
// console.log(user)
// console.log(postId)

///////////////////////////UseState and UseEffect for Mapping Out Comments

//Initial State
const commentInfo = {
    userId: user.id,
    postId: postId,
    commentText: ''
}
// console.log(commentInfo.userName)
// console.log(commentInfo.postId)


//UseState with:
//comment as current state
//setComment as function to update comment (current state)
//commentInfo is the initial value of useState
const [comment, setComment] = useState(commentInfo)


//HandleChange to Change: track typing & input text into box
//Func to use setComment(updater func) to UPDATE CURRENT STATE AKA "comment"
//Start with spread operator of current state, then add key-value pair: 
//Specifying key of commentText w/ event.target.VALUE (look for value below to match it up)
const handleChange = (event) => {
    setComment({...comment, ['commentText']: event.target.value})
}

//axios call (which needs to be called/invoked) to CREATE or post the comment, w/ the current state "comment" as its value/reference
const handleComments = async () => {
    const post = await axios.post(`https://holly-gram-backend-2-production.up..app/comment/`, comment)
    // console.log(comment)
    return post.data
}

//HandleSubmit to Submit: 
//event.preventDefault to prevent the page from refreshing
//running handleComments axios call to create AKA post the comment, with the new "current" state
//handlePosts was from the Feed.jsx, continues to display the feed
//setComment sets the current state to INCLUDE the new value (ACTUALIZING the HandleChange)
const handleSubmit = (event) => {
event.preventDefault();
    handleComments(comment)
    handlePosts()
    //recalling the handlePosts here because it's a RESTful API
    setComment(commentInfo)
    // window.location.reload()
}

//Another UseState to hold onto changes to post them
//start with null value as initial value
//showComments function to get AKA post READ AKA DISPLAY comment
//setAllComments changes the state of comments
const [comments, setAllComments] = useState (null)
const showComments = async() => {
    const post = await axios.get(`https://hollygrambackend.herokuapp.com/comment/${postId}/`)
    // console.log(post.data)
    setAllComments(post.data)
}

//UseEffect invokes function to show comments on screen
useEffect(() => {
    showComments()
    }, [])
//to make the comment just show always, remove the [] after the curly bracket, then comment out window.location.reload()

/////////////////////////////////////////////////////////////////////////





return comments ? (
<div>    

    <div className="Comment-Section">
        
        <div className="InputToComment">
        <form onSubmit={handleSubmit}>
        
            <input  
                    type="text"
                    placeholder="Your Comment Here"
                    onChange={handleChange}
                    value={commentInfo.comment}
                                            />

            <button className="button-styling" type="submit">
            Post Comment
            </button>
        </form>
        <br/>
        <br/>
        <span className="postCommentText">🎁 All Comments 🎁</span>
        <br/>
        <br/>

        </div>

        <div className="InputToComment">
        {comments ? ( comments.map((postComment) => (
                    <div className="AllComments" key={postComment.commentText}>
                        <div>
                        <span className="comment-userId">{postComment.userId} - </span>
                        <span className="comment-text">{postComment.commentText}</span>
                        <br/>
                        </div>
                    
                    
                        <div>
                        <EditComment comment={postComment}/>
                        </div>

                    </div>
                    )))

                :(<div></div>)
                }
        </div>




    </div>
</div>
) : (
    <div>
    </div>
)

} 
