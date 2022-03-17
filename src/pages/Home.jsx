import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [listOfPost, setListOfPost] = useState([]);
    const history = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:5000/posts").then((response) => {
            console.log(response.data);
            setListOfPost(response.data);
        });
    }, []);

    const likePost = (postId) => {
        axios.post("http://localhost:5000/likes", { PostId: postId }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
  
            //update likes
            setListOfPost(listOfPost.map((post)=>{
                if (post.id === postId){
                    if(response.data.liked){
                        return {...post, Likes:[...post.Likes, 0]} //здесь ... оператор расширения ...[] - деструктуризация остаточных параметров
                    } else{
                        const likeArray = post.Likes
                        likeArray.pop()
                        return {...post, Likes: likeArray }
                    }
                    
                } else{
                    return post
                }
            }))
        })
    }
    return (
        <div>
            {listOfPost.map((value, key) => {
                return (
                    <div key={key} className="post">
                        <div className="title">{value.title}</div>
                        <div className="body" onClick={() => {
                            history(`/post/${value.id}`)
                        }}>{value.postText}</div>
                        <div className="footer">{value.username}
                            <button onClick={() => {
                                likePost(value.id)
                            }}>Like</button>
                            <label>{value.Likes.length}</label>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;