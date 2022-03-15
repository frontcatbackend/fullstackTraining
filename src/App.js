import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [listOfPost, setListOfPost] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((response) => {
      console.log(response.data);
      setListOfPost(response.data);
    });
  }, []);

  return (
    <div className="App">
      {listOfPost.map((value, key) => {
        return (
          <div className="post">
            <div className="title">{value.title}</div>
            <div className="body">{value.postText}</div>
            <div className="body">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
