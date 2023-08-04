import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router';

import { auth } from '../../firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LoginButton from './SignInButton';

import Logo from '../assets/logo2.png'
import { ProjectContext } from '../context/mainProject';
import { ItemsContext } from '../context/itemsContext';

import './module.css'

import CSVExport from './CSVExport';

const NavBar = ({ navRef, user }) => {

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()


  const { mainProject, setMainProject } = useContext(ProjectContext)
  const { mainItems, setMainItems } = useContext(ItemsContext)

  useEffect(() => {
    setLoading(true)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false)
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const homeNav = (e:React.MouseEvent<HTMLElement>) => {
    navigate('/')
  }

  return (
    <div ref={navRef} className="flex flex-row min-w-full fixed h-[8vh] min-h-[60px] bg-[#FBF5EC] z-[4] top-0 left-0 max-h-[60px] sticky flex flex-row items-center px-5 justify-between py-2">
      <div className="flex flex-row cursor-pointer items-center gap-5" onClick={homeNav} >
        <img src={Logo} className="w-[40px]" />
      </div>
      <div className="flex flex-row font-bold fade-in-delay0 fixed left-[45%]">
        {mainProject ? mainProject.name : ''}
      </div>
      <div className="flex flex-row items-center gap-5">
        {
          mainProject && mainItems.length > 0
          ? <div className="fade-in-delay0 "><CSVExport items={mainItems} project={mainProject} /></div>
          : null
        }
        {
          loading
          ? null
          : user
            ? <button
              onClick={() => signOut(auth).then(() => { console.log('Ciao!')})}
              className="gap-2 normal-case font-medium flex flex-row text-sm hover:text-[#65D072] text-[#1C1E21]/90 transition-opacity transition-all" >Log out</button>
            : <LoginButton />
        }
      </div>
    </div>
  )

}

export default NavBar

// text-[#65D072]