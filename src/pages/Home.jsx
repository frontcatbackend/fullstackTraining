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
    return (
        <div>
            {listOfPost.map((value, key) => {
                return (
                    <div key={key} className="post" onClick={()=>{
                       history(`/post/${value.id}`)
                    }}>
                        <div className="title">{value.title}</div>
                        <div className="body">{value.postText}</div>
                        <div className="footer">{value.username}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;