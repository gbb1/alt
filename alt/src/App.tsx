import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

import Draggable from 'react-draggable';

import NavBar from './components/Navbar';

import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';

// import { useNavigate } from 'react-router';
import { auth, db } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';


import Project from './views/Project'
import Overview from './views/Overview';
import Login from './views/Login';
import Footer from './components/Footer';

function App() {

  const navRef = useRef(null)
  // const navigate = useNavigate()

  const [user] = useAuthState(auth);

  // const AuthCheck = onAuthStateChanged(auth, (user) => {
  //   console.log('changed', auth.currentUser?.email)
  //   if (user) {
  //     // setLoading(false);
  //   } else {
  //     console.log('unauthorized');
  //     navigate('/login');
  //   }
  // });


  const handleScroll = (event) => {
    if (event.target.scrollTop > 0) {
      navRef.current.classList.add('transition-all');
      navRef.current.classList.add('border-b-2');
      navRef.current.classList.add('border-b-[#1C1E21]/60');
    } else {
      navRef.current.classList.remove('shadow-md');
      navRef.current.classList.remove('border-b-2');
      navRef.current.classList.remove('border-b-[#1C1E21]/60');
    }
  };

  return (

    <div className="">
      <div onScroll={handleScroll} className="fixed top-0 left-0 h-full w-full bg-[#FBF5EC] overflow-auto">
        <Router>
          <NavBar navRef={navRef} user={user} />
          <Routes>
            <Route path='/' element={<Overview />} />
            <Route path='/login' element={<Login />} />
            <Route path='/project' element={<Project />} />
          </Routes>
          {/* <Footer /> */}
        </Router>
      </div>
    </div>
  )
}

export default App

/*

                  <Draggable
                    key={`user${user.user_id}`}
                    position={{ x: x, y: y }}
                    onDrag={dragHandler}
                    onStop={upHandler}
                    axis="x"
                  >
                    <div
                      id="test"
                      key={`user${user.user_id}`}
                      className={`profile-card
                        ${out === user.user_id ? 'unmount' : ''}
                        ${pass === user.user_id ? 'pass-unmount' : ''}
                        ${front === user.user_id ? 'mount' : ''}
                        ${back === user.user_id ? 'back-mount' : ''}
                        ${index === 0 ? 'back' : ''}
                      `}
                    >
                      <div className="card-wrapper">
                        <ProfileCard user={user} distance={distances[user.location]} />
                      </div>
                    </div>
                  </Draggable>


                  */
