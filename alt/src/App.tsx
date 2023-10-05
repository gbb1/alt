/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useRef } from 'react'

import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';

import { auth } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';

import NavBar from './components/Navbar';
import Project from './views/Project'
import Overview from './views/Overview';
import Login from './views/Login';
import Demo from './views/Demo';

import { ProjectContext } from './context/mainProject';
import { ItemsContext } from './context/itemsContext';
// import { SavingContext } from './context/savingContext';

import './App.css'

function App() {

  const navRef = useRef<HTMLDivElement>(null)

  const [mainProject, setMainProject] = useState<object>({})
  const [mainItems, setMainItems] = useState<Array<object>>([])
  // const [mainSaving, setMainSaving] = useState<boolean>(false)

  const [user] = useAuthState(auth);

  const handleScroll = (event:any) => {
    if (!navRef.current) return
    if (!navRef.current.classList) return
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
            <ItemsContext.Provider
              // @ts-ignore
              value={{ mainItems, setMainItems }} >
                <Router>
                  <NavBar navRef={navRef} user={user} />
                  <Routes>
                    <Route path='/' element={<Overview />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/project' element={<Project
                      //@ts-ignore
                      setMainProject={setMainProject} />} />
                    <Route path='/demo' element={<Demo />} />
                  </Routes>
                </Router>
            </ItemsContext.Provider>
          </ProjectContext.Provider>
      </div>
    </div>
  )
}

export default App
