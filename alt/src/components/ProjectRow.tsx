import { useEffect, useState } from 'react';

import ProjectName from './ProjectName';
import DeleteProject from './DeleteProject';


const ProjectRow = ({ project, count, date, handleNav, projects, email, update, setUpdate }:any) => {

  const [id, setId] = useState<number>()
  const [name, setName] = useState<string>()

  useEffect(() => {
    setId(project.id)
    setName(project.name)
  }, [projects, project])

  return (
    <div className="flex flex-row w-full px-4 py-2 cursor-pointer bg-[#202C34] hover:bg-[#202C34]/80 rounded-lg justify-between items-center">
      <ProjectName email={email} project={project} id={id} name={name} projects={projects} />
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
      <div className="flex flex-row gap-2">
        <button id={project.id} className="btn normal-case" onClick={handleNav}>
          Edit
        </button>
        <DeleteProject email={email} id={id} update={update} setUpdate={setUpdate} />
      </div>
    </div>
  )
}

export default ProjectRow
