import Nav from './Nav'
import Snowman from '../assets/Snowman.png'
import axios from 'axios'
import Comment from './Comment'

import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

export default function Feed ({ user, authenticated }) {
    let navigate = useNavigate()


//UseState and UseEffect for Mapping Out Users
const [users, setUsers] = useState([])
// const [loggedIn, setLoggedIn] = useState({})

useEffect(() => {
const handleUsers = async () => {
    const data = await fetch("https://hollygrambackend.herokuapp.com/user/allusers")
    // console.log(data)
    const us = await data.json()
    setUsers(us)
    // console.log(us)
    // const data1 = { username: 'example' };
}
handleUsers()
// setLoggedIn(user)
// console.log(loggedIn)
}, [])  
// console.log(loggedIn)
// console.log(users)

const handlePosts = async () => {
    const post = await fetch("https://hollygrambackend.herokuapp.com/feed/")
    // console.log(post)

    const postInJSON = await post.json()
    setPosts(postInJSON)
    // console.log(postInJSON)
}

//UseState and UseEffect for Mapping Out Posts
const [posts, setPosts] = useState([])
useEffect(() => {
handlePosts()
}, [])
// console.log(posts)


//DELETING a post based on its ID
const handleDeletePosts = async (postNumber) => {
        const post = await axios.delete(`https://hollygrambackend.herokuapp.com/feed/${postNumber}`)
        // window.location.reload()
        return (post)
        // console.log(postNumber)

}
//In our button, it has on OnClick for handleDeletePosts, with a parameter of value.id
//When the posts get mapped out, the div (similar to Tierra's P2) all have a key of value.id
//So after mapping when we click the button, the parameter is the specific value ID (AKA post1 has generated value.id of 1)
//Then in our handleDeletePosts function, "posts" is the parameter AKA it's actually value.id of 1
//So, we are actually passing in 1, the value.id, into the axios call, which deletes the Post #1


//Return to Display On Screen
return (user && authenticated ) ? (

<div>

    <div id="NavBarLocation">
    <Nav/>
    </div>

    <div id='FeedContent'>

        <div className="FeedPosts">
        <h1>Posts & Feed</h1>

                {/* Mapping out posts into Feed Section */}
                {posts.map((post) => (
                    
                <div className="IndividualFeedPosts" key={post.id}>
                    <div className="postWrapper">
                        <div className="postTop">
                            <div className="postTopLeft">
                                <img id="snowman" src={Snowman} alt="profileposticon"/>
                                <span className="postUsername">{post.id}</span>
                                
                            </div>

                            <div className="postTopMiddle">
                            <span className="postDate">{post.createdAt.slice(0,10)}</span>
                            </div>

                            <div className="postTopRight">
                                <button onClick={()=>handleDeletePosts(post.id)}className="delete-container">Delete</button>
                            </div>
                        </div>

                    <div className="PostCenter"></div>
                        <img className="postImg" src={post.picture} alt="User's Post Pic"/>
                        <span className="postText">{post.postText}</span>
                    </div>

                    <div className="PostBottom">
                        <div className="PostBottomLeft">
                            <span className="NumberOfLikes">{post.likes} Likes</span>
                            <br/>
                            <br/>
                        </div>

                        <div className="postBottomRight">
                            
                        </div>
                        <br/>
                        <Comment user={user} postId={post.id} handlePosts={handlePosts}/>
                        <br/>

                        
                    </div> 
                </div>
                ))}
        </div>

    {/* Right Hand Column */}
    <div className="SuggestionsForYou">

        <h1>Users</h1>

        <div className="IndividualProfileAndSuggestions">
        {users.map((user) => (
                    <div className="card" key={user.id}>
                    <h3>{user.userName}</h3>
                    <img className="pics" style={{ display: 'block' }} src={user.profilePic} alt="Doesn't Have A Profile Pic" />
                    </div>
                ))}
        </div>
    </div>

    </div>
</div>
    )
      //JSX for an unauthenticated user:
    : (
        <div className="protected">
            <h1 className="Redirection">Sign in to see Hollygram & Updates!</h1>
            <button className="RegisterButtons" onClick={()=> navigate('/SignIn')}>Sign In</button>
        </div>
    )
}