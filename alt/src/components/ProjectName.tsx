import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

import { IoClose } from 'react-icons/io5'


const ProjectName = ({ name }:any) => {

  const [text, setText] = useState(name)

  const handleChange = (e) => {
    e.preventDefault()
    setText(e.target.value)
  }

  return (

        <div className="flex flex-col items-start p-3 m-1 relative h-min">
          <input type="text" value={text} onChange={handleChange} />
        </div>
  )
}

export default ProjectName
