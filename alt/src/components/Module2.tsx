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

import { createUser } from '../../db/projects'

import './module.css'
// Import the functions you need from the SDKs you ne
// import { userAuth } from '../AuthContext'

const Module2 = ({ isVisible }) => {

  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setShow1(true)
      }, 200)

      setTimeout(() => {
        setShow2(true)
      }, 500)
    }
  }, [isVisible])


  // bg-[#1C1E21]/90
  return (

    <div className="overflow-y-auto mx-10 border-2 ">
      <div className="flex-col justify-center">

        <div className={`p-10 rounded-lg flex flex-col items-center py-20 ${ isVisible ? '' : 'invisible'}`}>
          {/* <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" /> */}
          <h1 className={`text-6xl text-[#65D072] font-bold ${ show1 ? 'fade-in-delay2' : 'invisible'}`}>What is Content Design?</h1>
          <div className={`py-6 text-3xl text-[#FBF5EC] flex flex-row gap-2 ${ show2 ? 'fade-in-delay2' : 'invisible'}`}></div>
          {/* <button className="btn btn-primary">Get Started</button> */}
        </div>
      </div>
    </div>

  )
}

export default Module2