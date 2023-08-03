import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import {
  BrowserRouter as Router, Link, Route, Routes,
} from 'react-router-dom';
import { auth } from '../../firebaseConfig'

import { FcGoogle } from 'react-icons/fc'
import { AiFillGoogleCircle } from 'react-icons/ai'

import LoginButton from '../components/SignInButton';
import Module2 from '../components/Module2';
import Module3 from '../components/Module3';

import { createUser } from '../../db/projects'
// Import the functions you need from the SDKs you ne
// import { userAuth } from '../AuthContext'

const Login = ({ }) => {

  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  const [mod2Vis, setMod2Vis] = useState(false)
  const [mod3Vis, setMod3Vis] = useState(false)

  const handleVisible = (callback) => {
    callback(true)
  }

  const module2Ref = useRef(null)
  const module3Ref = useRef(null)

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    });
  }, [])

  useEffect(() => {
    const options1 = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.6, // Adjust this value as needed, 0.1 means 10% of the target element is visible
    };

    const options2 = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.5, // Adjust this value as needed, 0.1 means 10% of the target element is visible
    };

    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleVisible(setMod2Vis); // Call the callback when the element is visible
          observer2.unobserve(entry.target); // Stop observing once the element is visible
        }
      });
    }, options1);

    const observer3 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleVisible(setMod3Vis); // Call the callback when the element is visible
          observer3.unobserve(entry.target); // Stop observing once the element is visible
        }
      });
    }, options2);

    if (module2Ref.current) {
      observer2.observe(module2Ref.current);
    }

    if (module3Ref.current) {
      observer3.observe(module3Ref.current);
    }

    return () => {
      observer2.disconnect();
      observer3.disconnect();
    };
  }, [handleVisible]);


  const handleNav = (e) => {
    e.preventDefault()
    navigate('/')
  }

  // useEffect(() => {
  //   console.log(module1Ref.current)

  // }, [module1Ref])
  // const navigate = useNavigate();
  // const [email, setEmail] = useState('')
  // const [pw, setPw] = useState('')

  // const signInWithGoogle = async (e:React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   signInWithPopup(auth, new GoogleAuthProvider())
  //     .then((response) => {
  //       console.log(response.user.uid);
  //       createUser(response.user.email)
  //         .then(() => {
  //           navigate('/');
  //         })
  //         .catch(() => {
  //           console.log('err')
  //         })
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }

  // const signUpNav = (e:React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   navigate('/signup');
  // }

  return (
    <div className="flex flex-col gap-10">
      <div className="overflow-y-auto mx-10 mt-5">
        {/* <div className="h-[8vh] w-full min-h-[50px]"></div> */}

        <div className="flex-col-reverse lg:flex-row-reverse gap-20">
          {/* <div className="">
            <div className="flex justify-center bg-base-200 pt-10 pb-10 rounded-lg ">
                <div className="flex flex-col gap-2 justify-center items-center w-96">
                  <h1 className="mt-0 mb-10">Log in</h1>
                  <button
                    type="submit"
                    className="btn"
                    onClick={signUpNav} >
                      Sign up
                  </button>
                </div>
              </div>
          </div> */}
          <div className="bg-[#1C1E21]/90 p-10 rounded-lg min-h-[60vh] flex flex-col justify-center">
            {/* <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" /> */}
            <h1 className="text-8xl text-[#65D072] font-bold w-[90%] ">Figma, Google docs, and Trello walk into a bar...</h1>
            <div className="py-6 text-3xl text-[#FBF5EC] flex flex-row gap-2">alt. is a project editor built for the Content Design process, from ideation to organization to translation.</div>
            {/* <button className="btn btn-primary">Get Started</button> */}
            <div className="mt-8">
              {
                user
                ? <button
                  type="submit"
                  className=""
                  onClick={handleNav} >
                    <div className="btn gap-2 text-sm normal-case flex flex-row bg-[#65D072] border-2 border-[#1C1E21]/90 rounded-full px-4">
                      Let's go
                    </div>
                </button>
                : <LoginButton />
              }
            </div>
          </div>
        </div>
      </div>
      <div ref={module2Ref} className={`${mod2Vis ? '' : 'invisible'}`}>
        <Module2 isVisible={mod2Vis} />
      </div>
      <div ref={module3Ref} className={`${mod3Vis ? '' : 'invisible'}`}>
        <Module3 isVisible={mod3Vis} />
      </div>
      {/* <div ref={module2Ref} className={`${mod2Vis ? '' : 'invisible'}`}>
        <Module2 isVisible={mod2Vis} />
      </div> */}
    </div>

  )
}

export default Login