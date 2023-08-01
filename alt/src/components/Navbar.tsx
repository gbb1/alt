import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';

import { auth } from '../../firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LoginButton from './SignInButton';

import Logo from '../assets/logo2.png'

const NavBar = ({ navRef, user }) => {

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const homeNav = (e) => {
    navigate('/')
  }

  return (
    <div ref={navRef} className="flex flex-row w-full h-[8vh] min-h-[50px] bg-[#FBF5EC] z-[4] top-0 max-h-[60px] sticky flex flex-row items-center px-5 justify-between py-2">
      <div className="flex flex-row cursor-pointer" onClick={homeNav} >
        <img src={Logo} className="w-[40px]" />
      </div>
      <div className="flex flex-row  ">
        center
      </div>
      <div className="flex flex-row ">
        {
          user
          ? <button
            onClick={() => signOut(auth).then(() => console.log("out"))}
            className="btn gap-2 normal-case flex flex-row bg-[#65D072] border-2 border-[#1C1E21]/90 rounded-full px-4 py-2" >Log out</button>
          : <LoginButton />
        }
      </div>
    </div>
  )

}

export default NavBar