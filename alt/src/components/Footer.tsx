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

const Footer = () => {


  return (

    <div className=" border-2 absolute bottom-0 w-full">
      <div className="h-[8vh] w-full min-h-[50px]"></div>

      <div className="flex-col-reverse lg:flex-row-reverse gap-20">

        <div className="bg-[#1C1E21]/90 p-10 rounded-lg">
          {/* <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" /> */}
          {/* <h1 className="text-8xl text-[#65D072] font-bold">Figma, Google docs, and Trello walk into a bar...</h1> */}
          <p className="py-6 text-3xl text-[#FBF5EC] flex flex-row gap-2">alt. is a project editor built for the <div className="text-[#6590D0]">Content Design</div> process, from ideation to organization to translation.</p>
          {/* <button className="btn btn-primary">Get Started</button> */}
        </div>
      </div>
    </div>

  )
}

export default Footer