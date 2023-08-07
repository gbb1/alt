import { useState, useRef, useEffect, useContext, createContext } from 'react'

import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';

import { auth, db } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';

import NavBar from './components/Navbar';
import Project from './views/Project'
import Overview from './views/Overview';
import Login from './views/Login';
import Footer from './components/Footer';

import { ProjectContext } from './context/mainProject';
import { ItemsContext } from './context/itemsContext';
import { SavingContext } from './context/savingContext';

import './App.css'

function App() {

  const navRef = useRef(null)

  const [mainProject, setMainProject] = useState<object>({})
  const [mainItems, setMainItems] = useState<Array<object>>([])
  const [mainSaving, setMainSaving] = useState<boolean>(false)

  const [user] = useAuthState(auth);

  const handleScroll = (event:any) => {
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
            <SavingContext.Provider value={{ mainSaving, setMainSaving}} >
              <Router>
                <NavBar navRef={navRef} user={user} />
                <Routes>
                  <Route path='/' element={<Overview setMainProject={setMainProject} />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/project' element={<Project setMainProject={setMainProject} />} />
                </Routes>
              </Router>
            </SavingContext.Provider >
          </ItemsContext.Provider>
        </ProjectContext.Provider>
      </div>
    </div>
  )
}

export default App
