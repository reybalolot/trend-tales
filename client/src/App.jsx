import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { Container } from "react-bootstrap";
import { jwtDecode } from 'jwt-decode';
import UserContext from './context/UserContext.js';
import NavigationBar from './components/NavigationBar.jsx';
import Login from './pages/Login.jsx';
import Registration from './pages/Register.jsx';
import Blogs from './pages/Blogs.jsx';
import Post from './pages/Post.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {

  const [user, setUser] = useState({
    id: null,
    email: null,
    username: null,
    isAdmin: null
  })
  const unsetUser = () => {
    localStorage.clear();
    setUser({
      id: null,
      email: null,
      username: null,
      isAdmin: null
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(jwtDecode(token));
    } else {
      setUser({
        id: null,
        email: null,
        username: null,
        isAdmin: null
      })
    }
  }, [])

  return (
    <>
      <UserContext.Provider value={{user, setUser, unsetUser}}>
        <Router>
              <div className='main-container'>
                <NavigationBar/>
                <Routes>
                  <Route path="/" element={<Blogs/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/register" element={<Registration/>}/>
                  <Route path="/blogs" element={<Blogs/>}/>
                  <Route path="/post" element={<Post/>}/>
                </Routes>
                  </div>
          </Router>
      </UserContext.Provider>
    </>
  )
}

export default App
