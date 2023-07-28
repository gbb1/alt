import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

import Draggable from 'react-draggable';

import NavBar from './components/Navbar';

import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';

import { auth, db } from '../firebaseConfig'

import Project from './views/Project'
import Overview from './views/Overview';

function App() {

  const navRef = useRef(null)

  const handleScroll = (event) => {
    if (event.target.scrollTop > 0) {
      navRef.current.classList.add('transition-all');
      navRef.current.classList.add('border-b-2');
      navRef.current.classList.add('border-b-[#1C1E21]');
    } else {
      navRef.current.classList.remove('shadow-md');
      navRef.current.classList.remove('border-b-2');
      navRef.current.classList.remove('border-b-[#1C1E21]');
    }
  };

  return (

    <div className="">
      <div onScroll={handleScroll} className="fixed top-0 left-0 h-full w-full bg-[#FBF5EC] overflow-auto">
        <NavBar navRef={navRef} />
        <Router>
          <Routes>
            <Route path='/' element={<Overview />} />
            <Route path='/project' element={<Project />} />
          </Routes>
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
