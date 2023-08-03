import { useState, useRef, useEffect, useContext, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { onVisible } from 'intersection-observer'
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

import { ProjectContext } from './context/mainProject';
import { ItemsContext } from './context/itemsContext';

function App() {

  const navRef = useRef(null)
  // const [mod2Vis, setMod2Vis] = useState(false)

  // const handleVisible = () => {
  //   setMod2Vis(true)
  // }
  // const navigate = useNavigate()
  // const ProjectContext = createContext({})
  const [mainProject, setMainProject] = useState({})
  const [mainItems, setMainItems] = useState([])

  useEffect(() => {
    console.log('main', mainProject)
  }, [])

  const [user] = useAuthState(auth);

  const handleScroll = (event) => {
    if (event.target.scrollTop > 0) {
      navRef.current.classList.add('transition-all');
      navRef.current.classList.add('border-b-2');
      navRef.current.classList.add('border-b-[#1C1E21]/90');
    } else {
      navRef.current.classList.remove('shadow-md');
      navRef.current.classList.remove('border-b-2');
      navRef.current.classList.remove('border-b-[#1C1E21]/90');
    }
  };

  return (

    <div className="">
      <div onScroll={handleScroll} className="fixed top-0 left-0 h-full w-full bg-[#FBF5EC] overflow-auto">
        <ProjectContext.Provider value={{ mainProject, setMainProject }} >
          <ItemsContext.Provider value={{ mainItems, setMainItems }} >
            <Router>
              <NavBar navRef={navRef} user={user} />
              <Routes>
                <Route path='/' element={<Overview setMainProject={setMainProject} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/project' element={<Project setMainProject={setMainProject} />} />
              </Routes>
            {/* <Footer /> */}
            </Router>
            </ItemsContext.Provider>
        </ProjectContext.Provider>
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
