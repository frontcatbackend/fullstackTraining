import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import {AuthContext} from "./helpers/AuthContext"
import {useState, useEffect} from 'react'
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState(false)

  useEffect(()=>{
    axios.get("http://localhost:5000/auth/auth",{
      headers:{
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((response)=>{
      if(response.data.error){
        setAuthState(false)
      }else{
        setAuthState(true)
      }
    })
  }, [])
  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <BrowserRouter>
        <div className="navbar">
        <Link to="/"> Home Page</Link>
          {authState && (
         <>
          <Link to="/createpost"> Create A Post</Link>
          <Link to="/login"> Login</Link>
          <Link to="/registration"> Registration</Link>
          </>
          )}
        </div>

        {authState && (
          <div className="App">
          <Routes>
          <Route path="/createpost" exact element={<CreatePost />}></Route>
          <Route path="/post/:id" exaxt element={<Post />}></Route>
          <Route path="/registration" exaxt element={<Registration />}></Route>
          <Route path="login" exaxt element={<Login />}></Route>
          </Routes>
          </div>
        )}
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/post/:id" exaxt element={<Post />}></Route>
          <Route path="login" exaxt element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
