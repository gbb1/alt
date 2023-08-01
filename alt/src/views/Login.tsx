import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import {
  BrowserRouter as Router, Link, Route, Routes,
} from 'react-router-dom';
import { auth } from '../../firebaseConfig'

import { FcGoogle } from 'react-icons/fc'
import { AiFillGoogleCircle } from 'react-icons/ai'

import LoginButton from '../components/SignInButton';
import Module2 from '../components/Module2';

import { createUser } from '../../db/projects'
// Import the functions you need from the SDKs you ne
// import { userAuth } from '../AuthContext'

const Login = () => {

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
          <div className="bg-[#1C1E21]/90 p-10 rounded-lg">
            {/* <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" /> */}
            <h1 className="text-8xl text-[#65D072] font-bold w-[90%]">Figma, Google docs, and Trello walk into a bar...</h1>
            <p className="py-6 text-3xl text-[#FBF5EC] flex flex-row gap-2">alt. is a project editor built for the Content Design process, from ideation to organization to translation.</p>
            {/* <button className="btn btn-primary">Get Started</button> */}
            <div className="mt-8">
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
      <Module2 />
    </div>

  )
}

export default Login