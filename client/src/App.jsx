import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { Container } from "react-bootstrap";
import { jwtDecode } from 'jwt-decode';
import UserContext from './context/UserContext.js';
import NavigationBar from './components/NavigationBar.jsx';
import Login from './pages/Login.jsx';
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
            <Container>
              <NavigationBar/>
              <Routes>
                <Route path="/" element={<Login/>}/>
                {/* <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegistrationPage/>}/>
                <Route path="/movies" element={<MoviesPage/>}/> */}
              </Routes>
            </Container>
          </Router>
      </UserContext.Provider>
    </>
  )
}

export default App
