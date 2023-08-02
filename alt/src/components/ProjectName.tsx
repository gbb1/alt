import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

import { IoClose } from 'react-icons/io5'

import { updateName } from '../../db/projects'


const ProjectName = ({ email, name, project, update }:any) => {

  const [text, setText] = useState(name)
  const [debouncedText, setDebouncedText] = useState("");


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [text, 500]);

  const handleChange = (e) => {
    e.preventDefault()
    setText(e.target.value)
  }

  useEffect(() => {
    updateName(email, project.id, debouncedText)
      .then(() => {
        console.log('saved')
      })
      .catch((err) => {
        console.log(err)
      })

  }, [debouncedText])

  return (

        <div className="flex flex-col items-start p-2 m-1 relative h-min text-white bg-[#202C34]">
          <input type="text" className="bg-transparent p-1" value={text} onChange={handleChange} />
        </div>
  )
}

export default ProjectName
