import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';



const Post = () => {
    let { id } = useParams()
    const [postObject, setPostObject] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const {authState} = useContext(AuthContext)

    const history = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:5000/posts/byId/${id}`).then((response) => {
            console.log(response.data);
            setPostObject(response.data)
        });

        axios.get(`http://localhost:5000/comments/${id}`).then((response) => {
            console.log(response.data);
            setComments(response.data)

        });
    }, [])
    const addComment = () => {
        axios.post("http://localhost:5000/comments", {
            commentBody: newComment,
            PostId: id
        },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }

        ).then((response) => {
            if (response.data.error) {
                console.log(response.data.error)
            } else {
                console.log("comment added")

                const commentToAdd = {
                    commentBody: newComment,
                    username: response.data.username
                }
                setComments([...comments, commentToAdd]) //refrsh page
                setNewComment("")
            }

        })
    }

    const deletePost = (id) =>{
        axios.delete(`http://localhost:5000/posts/${id}`,{
            headers:{ accessToken: localStorage.getItem("accessToken")}
        }).then(()=>{
            history("/")
        })
    }

    return (
        <div className="postPage">
        <div className="leftSide">
          <div className="post" id="individual">
            <div className="title"> {postObject.title} </div>
            <div className="body">{postObject.postText}</div>
            <div className="footer">
              {postObject.username}
              {authState && (
                   <button onClick={()=>{
                    deletePost(postObject.id)
                }}>Delete</button>
              )}
             
            </div>
          </div>
        </div>
            <div className='rightSide'>
                <div className='addCommentContainer'>
                    <input type="text" placeholder='Comments' value={newComment} onChange={(e) => {
                        setNewComment(e.target.value)
                    }} />
                    {authState && (<button onClick={addComment}> Add Comment</button>)}
                    
                    <div className='listOfComments'>
                        {comments.map((comment, key) => {
                            return <div key={key} className='comment'>
                                Comment: {comment.commentBody} <br/>
                                <label> Username: {comment.username} </label>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;