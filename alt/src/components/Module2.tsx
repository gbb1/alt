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


import Col1 from '../assets/col1.png'
import Col2 from '../assets/col2.png'
import Col3 from '../assets/col3.png'

import './module.css'
// Import the functions you need from the SDKs you ne
// import { userAuth } from '../AuthContext'

const Module2 = ({ isVisible }) => {

  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setShow1(true)
      }, 200)

      setTimeout(() => {
        setShow2(true)
      }, 600)

      setTimeout(() => {
        setShow3(true)
      }, 1000)
    }
  }, [isVisible])


  // bg-[#1C1E21]/90
  return (

    <div className="overflow-y-auto mx-10">
      <div className="flex-col justify-center">

        <div className={`p-10 rounded-lg flex flex-row gap-10 ${ isVisible ? '' : 'invisible'}`}>
          {/* <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" /> */}
          <div className="flex flex-col gap-5 justify-center max-w-[50%]">
            <h1 className={`text-6xl pl-10 text-[#65D072] font-bold ${ show1 ? 'fade-in-delay2' : 'invisible'}`}>alt. is built for your workflow</h1>
            <div className={`py-2 pl-20 mt-10 text-3xl font-light text-[#1C1E21]/90 flex flex-row gap-2 text-left lg:text-left max-w-[70%] ${ show1 ? 'fade-in-delay2' : 'invisible'}`}>
              • Quickly create variations of content and add a screenshot for reference.
            </div>
            <div className={`py-2 pl-20 w-full text-3xl font-light text-[#1C1E21]/90 flex flex-row gap-2 text-left lg:text-left max-w-[70%] ${ show2 ? 'fade-in-delay2' : 'invisible'}`}>
              • Drag and drop your variations or star your favorites to quickly organize your process.            </div>
            <div className={`py-2 pl-20 text-3xl font-light text-[#1C1E21]/90 flex flex-row gap-2 text-left lg:text-left max-w-[70%] ${ show3 ? 'fade-in-delay2' : 'invisible'}`}>
              • Quickly export your work to a csv so you can ship it or make changes in a spreadsheet.
            </div>

            {/* <div className={`py-6 text-3xl text-[#FBF5EC] flex flex-row gap-2 ${ show2 ? 'fade-in-delay2' : 'invisible'}`}></div> */}
          </div>
          <div className="flex flex-row gap-5">

            <div className={`${show1 ? 'swipeRight' : 'invisible'}`}>
              <img src={Col1} className="rounded-lg pt-10"/>
            </div>

            <div className={`${show2 ? 'swipeRight' : 'invisible'}`}>
              <img src={Col2} className="rounded-lg pt-5"/>
            </div>

            <div className={`${show3 ? 'swipeRight fade-in-delay0' : 'invisible'}`}>
              <img src={Col3} className="rounded-lg"/>
            </div>

          </div>
          {/* <button className="btn btn-primary">Get Started</button> */}
        </div>
      </div>
    </div>

  )
}

export default Module2