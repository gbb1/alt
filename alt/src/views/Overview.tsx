import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import {
  BrowserRouter as Router, Link, Route, Routes,
} from 'react-router-dom';
import { auth } from '../../firebaseConfig'

import { MdOutlineDragIndicator } from 'react-icons/md'
import { BiSolidHide, BiSolidShow } from 'react-icons/bi'

import Column from '../components/Column';

import { createUser, addProject, getProjects } from '../../db/projects.ts'
import { useGetProjects } from '../hooks/projects'

import { UserStateContext, AuthContext } from '../auth/AuthProvider';
import { useAuthState } from 'react-firebase-hooks/auth';

import ProjectName from '../components/ProjectName.tsx';

const Overview = () => {

  const navigate = useNavigate()
  const [update, setUpdate] = useState(false)
  const [load, setLoad] = useState(false)
  const [email, setEmail] = useState('')

  const user = useAuthState(auth);

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    // console.log('changed', auth.currentUser?.email)
    if (user) {
      // setLoading(false);
      if (email.length === 0) setEmail(user.email)
      // setEmail(user.email)
    } else {
      // console.log('unauthorized');
      navigate('/login');
    }
  });

  const { projects, loading, error } = useGetProjects(email, update);

  const handleClick = (e) => {
    setLoad(true)
    addProject(email).then(() => {
      setUpdate(!update)
      setLoad(false)
    })
  }

  const handleNav = (e) => {
    const project_id = e.target.id
    navigate('/project', { state: { project_id, email } });
  }


  return (
    <div className="">
      {/* Project: */}
      <div className="flex flex-col w-full gap-4 mt-[5vh] px-[5%]">
        <div className="flex flex-row justify-between gap-4">
          <h1 className="text-5xl text-[#1C1E21]/90 font-bold">Your projects:</h1>

          <button
            onClick={handleClick}
            className="btn normal-case w-max px-4 py-2 rounded-full flex flex-row items-center gap-2 justify-center bg-[#65D072] border-2 border-[#1C1E21]/90"
          >
            <div className=''>Create project</div>
            {
              !load
              ? null
              : <span className="loading loading-dots loading-xs"></span>
            }
          </button>
        </div>
        <div className="flex flex-col flex-wrap gap-4">
          {/* {
            load
            ? <span className="loading loading-dots loading-xs"></span>
            : null
          } */}
          <div className="flex flex-row w-full p-4 rounded-lg justify-between">
            Project
            <div className="">
              Details
            </div>
            <div>
            </div>
            <div className="mr-20">
              Last updated
            </div>

          </div>
          {
            projects && projects.map((p, index) => {
              const date = new Date(p.accessed.seconds * 1000)
              const count = p.data.length
              return (
                <div id={p.id} className="flex flex-row w-full px-4 py-2 cursor-pointer bg-white rounded-lg justify-between items-center">
                  {
                    p.name.length > 0
                    ? <ProjectName name={p.name} />
                    : <ProjectName name={'Project' + ' ' +  p.id} />
                  }
                  <div>
                    {
                      count === 1
                      ? <div className="">1 string</div>
                      : <div className="">{count} strings</div>
                    }
                  </div>
                  <div>
                  </div>
                  <div>
                    {date.toDateString() + ' - ' + date.getUTCHours() + ':' + date.getUTCMinutes()}
                  </div>
                  <button className="btn normal-case" onClick={handleNav}>
                    Edit
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Overview



  // useEffect(() => {
  //   // createUser('test@gmail.com')
  //   // addProject('test@gmail.com').then(res => {
  //   //   console.log(res)
  //   // })
  //   // getProjects('test@gmail.com').then(res => console.log(res))
  // }, [])


  // useEffect(() => {
  //   const element = document.getElementById('drag-' + moved)

  //   if (element?.classList.contains('border-2')) {
  //     element?.classList.remove('border-2')
  //   } else {
  //     element?.classList.remove('border-2')
  //   }


  //   // setTimeout(function(){
  //   //   // e.target.style.visibility = "hidden";
  //   //   // e.target.classList.add('border-2')
  //   //   // e.target.classList.add('p-0')
  //   // }, 0);
  // }, [moved])