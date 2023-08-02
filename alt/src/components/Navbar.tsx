import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';

import { auth } from '../../firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LoginButton from './SignInButton';

import Logo from '../assets/logo2.png'

const NavBar = ({ navRef, user }) => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()


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

  const homeNav = (e) => {
    navigate('/')
  }

  return (
    <div ref={navRef} className=" flex flex-row w-full h-[8vh] min-h-[60px] bg-[#FBF5EC] z-[4] top-0 max-h-[60px] sticky flex flex-row items-center px-5 justify-between py-2">
      <div className="flex flex-row cursor-pointer" onClick={homeNav} >
        <img src={Logo} className="w-[40px]" />
      </div>
      <div className="flex flex-row hidden">
        center
      </div>
      <div className="flex flex-row ">
        {
          loading
          ? null
          : user
            ? <button
              onClick={() => signOut(auth).then(() => console.log("out"))}
              className="gap-2 normal-case font-medium flex flex-row text-sm hover:text-[#65D072] text-[#1C1E21]/90 transition-opacity transition-all" >Log out</button>
            : <LoginButton />
        }
      </div>
    </div>
  )

}

export default NavBar

// text-[#65D072]