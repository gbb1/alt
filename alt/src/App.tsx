import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Draggable from 'react-draggable';

import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';

import { auth, db } from '../firebaseConfig'

import Project from './views/Project'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<div>hello</div>} />
          <Route path='/project' element={<Project />} />
        </Routes>
      </Router>
    </>
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
