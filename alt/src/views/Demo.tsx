/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../../firebaseConfig'

import { addProject } from '../../db/projects.ts'
import { useGetProjects } from '../hooks/projects'

// import { useAuthState } from 'react-firebase-hooks/auth';

import ProjectRow from '../components/ProjectRow.tsx';
import LoadingProjects from '../components/LoadingProjects.tsx';
import LoadingMain from '../components/LoadingMain.tsx';

import '../App.css'

const Demo = () => {

  const navigate = useNavigate()
  const [update, setUpdate] = useState<boolean>(false)
  const [load, setLoad] = useState<boolean>(false)
  const [loadingMain, setLoadingMain] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    setEmail('demo@gmail.com')
    setLoadingMain(false)
  }, [])

  const { projects, loading } = useGetProjects(email, update);

  const handleClick = (_e:React.MouseEvent<HTMLElement>) => {
    setLoad(true)
    addProject(email).then(() => {
      setUpdate(!update)
      setLoad(false)
    })
  }

  const handleNav = (e:React.MouseEvent<HTMLElement>) => {
    const project_id = (e.target as HTMLDivElement).id
    navigate('/project', { state: { project_id, email } });
  }

  if (loadingMain) return <LoadingMain />

  return (
    <div className="overscroll-none fixed w-full">
      <div className="flex flex-col w-full md:gap-4 mt-[5vh] px-[5%] overscroll-none ">
        <div className="flex flex-row justify-between gap-4 items-center">
          <h1 className="text-2xl md:text-5xl text-[#1C1E21]/90 font-bold">Your projects:</h1>

          <button
            onClick={handleClick}
            className="btn normal-case w-max px-4 py-2 dark:text-[#1C1E21]/90 rounded-full flex flex-row items-center gap-2 justify-center bg-[#65D072] border-2 border-[#1C1E21]/90"
          >
            <div className=''>Create project</div>
            {
              !load
              ? null
              : <span className="loading loading-dots loading-xs"></span>
            }
          </button>
        </div>
        <div className="flex flex-row w-full pt-4 px-2 md:px-4 rounded-lg justify-between">
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
          : <div className="flex flex-col gap-4 overflow-y-auto overscroll-contain scroll max-h-[65vh] md:max-h-[50vh] px-2 md:pt-2">
            {
              projects && projects.map((p:any, index) => {

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

export default Demo
