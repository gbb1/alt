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

import { createUser } from '../../db/projects'


const LoginButton = () => {

  const navigate = useNavigate();

  const signInWithGoogle = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        createUser(response.user.email)
          .then(() => {
            navigate('/');
          })
          .catch(() => {
            console.log('err')
          })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const signUpNav = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/signup');
  }

  return (
    <button
      type="submit"
      className=""
      onClick={signInWithGoogle} >
        <div className="btn gap-2 text-sm normal-case flex flex-row bg-[#65D072] border-2 border-[#1C1E21]/90 rounded-full px-4">
          <AiFillGoogleCircle /> Sign in with Google
        </div>
    </button>
  )
}

export default LoginButton