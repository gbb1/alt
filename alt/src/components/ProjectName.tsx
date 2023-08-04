import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

import { IoClose } from 'react-icons/io5'

import { updateName } from '../../db/projects'


const ProjectName = ({ email, name, project, update, id }:any) => {

  const [text, setText] = useState<string>(name || '')
  const [debouncedText, setDebouncedText] = useState<string>('');

  useEffect(() => {
    setText(name)
  }, [name])

  useEffect(() => {
    if (text === name) return
    const timeoutId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [text, name]);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setText(e.target.value)
  }

  useEffect(() => {
    if (!debouncedText) return
    updateName(email, id, debouncedText)
      .then(() => {
        console.log('saved new name')
      })
      .catch((err) => {
        console.log(err)
      })

  }, [debouncedText, email, id])

  return (

        <div className="flex flex-col items-start p-2 m-1 relative h-min text-white bg-transparent">
          <input type="text" className="bg-transparent p-1" value={text || ''} onChange={handleChange} />
        </div>
  )
}

export default ProjectName
