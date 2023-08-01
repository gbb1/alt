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
// Import the functions you need from the SDKs you ne
// import { userAuth } from '../AuthContext'

const Module2 = () => {


  return (

    <div className="overflow-y-auto mx-10 border-2">
      <div className="flex-col justify-center">

        <div className="bg-[#1C1E21]/90 p-10 rounded-lg flex flex-col items-center py-20">
          {/* <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" /> */}
          <h1 className="text-8xl text-[#65D072] font-bold">What is Content Design?</h1>
          <p className="py-6 text-3xl text-[#FBF5EC] flex flex-row gap-2">alt. is a project editor built for the <div className="text-[#6590D0]">Content Design</div> process, from ideation to organization to translation.</p>
          {/* <button className="btn btn-primary">Get Started</button> */}
        </div>
      </div>
    </div>

  )
}

export default Module2