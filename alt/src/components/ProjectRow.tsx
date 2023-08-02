import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

import { IoClose } from 'react-icons/io5'

import ProjectName from './ProjectName';


const ProjectRow = ({ project, count, date, handleNav, projects, update, email }:any) => {


  return (
    <div className="flex flex-row w-full px-4 py-2 cursor-pointer bg-[#202C34] rounded-lg justify-between items-center">
      {
        project.name.length > 0
        ? <ProjectName email={email} project={project} name={project.name} projects={projects} />
        : <ProjectName email={email} project={project} name={'Project' + ' ' +  project.id} projects={projects} />
      }
      <div className="text-white invisible md:visible">
        {
          count === 1
          ? <div className="">1 string</div>
          : <div className="">{count} strings</div>
        }
      </div>
      <div>
      </div>
      <div className="text-white invisible md:visible">
        {date.toDateString() + ' - ' + date.getUTCHours() + ':' + date.getUTCMinutes()}
      </div>
      <button id={project.id} className="btn normal-case" onClick={handleNav}>
        Edit
      </button>
    </div>
  )
}

export default ProjectRow
