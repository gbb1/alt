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

const Overview = () => {

  const navigate = useNavigate()

  const [projects, setProjects] = useState([])

  const project = {
    id: '',
    data: [],
    accessed: '',
    name: '',
  }


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

  const handleClick = (e) => {
    e.preventDefault()
    let ref = [...projects]

    ref.push(project)
    setProjects(ref)
  }

  const handleNav = (e) => {
    const project_id = e.target.id
    navigate('/project', { state: { project_id } });
  }

  // useEffect(() => {
  //   console.log(moveOverRef.current)
  // }, [moveOverRef])

  // useEffect(() => {
  //   console.log(selected)
  // }, [selected])


  return (
    <div className="">
      {/* Project: */}
      <div className="flex flex-col w-full gap-4 mt-[10vh] px-[5%]">
        <div className="flex flex-row gap-4 items-center">
          <h1>Your projects</h1>
          <button
            onClick={handleClick}
            className="w-max px-4 py-2 rounded-full flex flex-row items-center justify-center bg-[#65D072] border-2 border-[#1C1E21]/90"
          >
            Create project
          </button>
        </div>
        <div className="flex flex-row flex-wrap gap-4">
          {
            projects && projects.map((p, index) => {
              return (
                <div id={p.id} className="w-max p-4 cursor-pointer bg-white rounded-lg" onClick={handleNav}>
                  {
                    project.name.length > 0
                    ? project.name
                    : 'Project ' + index
                  }
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

