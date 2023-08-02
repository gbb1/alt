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

import { createUser, addProject, getProjects, deleteProject } from '../../db/projects.ts'
import { useGetProjects } from '../hooks/projects'

import { useAuthState } from 'react-firebase-hooks/auth';

import ProjectName from '../components/ProjectName.tsx';
import ProjectRow from '../components/ProjectRow.tsx';
import LoadingProjects from '../components/LoadingProjects.tsx';

import '../App.css'

const Overview = () => {

  const navigate = useNavigate()
  const [update, setUpdate] = useState(false)
  const [load, setLoad] = useState(false)
  const [email, setEmail] = useState('')

  // const [projs, setProjs] = useState([])

  const user = useAuthState(auth);

  useEffect(() => {
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
  }, [])

  const { projects, loading, error } = useGetProjects(email, update);
  // useEffect(() => {
  //   setProjs(projects)
  // }, [projects])

  // useEffect(() => {
  //   console.log('projects changed')
  // }, [projects])

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
    <div className="overscroll-none fixed w-full">
      {/* Project: */}
      <div className="flex flex-col w-full gap-4 mt-[5vh] px-[5%] overscroll-none ">
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
        <div className="flex flex-row w-full pt-4 px-4 rounded-lg justify-between">
          Project
          <div className="translate-x-20 invisible md:visible">
            Details
          </div>
          <div>
          </div>
          <div className="invisible md:visible -translate-x-16">
            Last updated
          </div>
          <button className="btn invisible">
            Edit
          </button>
        </div>
        {
          loading
          ? <LoadingProjects />
          : <div className="flex flex-col gap-4 overflow-y-auto overscroll-contain scroll max-h-[50vh] px-2 pt-2">
          {/* {
            load
            ? <span className="loading loading-dots loading-xs"></span>
            : null
          } */}
            {
              projects && projects.map((p, index) => {
                console.log(p)
                const date = new Date(p.accessed.seconds * 1000)
                const count = p.data.length
                return (
                  <ProjectRow update={update} setUpdate={setUpdate} key={index} email={email} project={p} date={date} count={count} handleNav={handleNav} projects={projects} />
                )
              })
            }
          </div>
        }
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