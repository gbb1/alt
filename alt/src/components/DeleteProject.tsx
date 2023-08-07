/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { deleteProject } from '../../db/projects'
import { IoClose } from 'react-icons/io5'


const DeleteProject = ({ email, setUpdate, update, id }:any) => {

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(false)
  }, [id])

  const handleDelete = (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    setLoading(true)
    if (id === undefined) console.log("id issue")
    deleteProject(email, id)
      .then(() => {
        setUpdate(!update)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <button
      type="submit"
      className=""
      onClick={handleDelete}>
        <div className="text-xl flex flex-row normal-case bg-[#65D072] outline-[#1C1E21]/90 rounded-full p-2 hover:border-gray-200 hover:bg-gray-200 transition-all duration-200">
          {
            loading || id === undefined
            ? <span className="loading loading-spinner loading-sm"></span>
            : <IoClose />
          }
        </div>
    </button>
  )
}

export default DeleteProject