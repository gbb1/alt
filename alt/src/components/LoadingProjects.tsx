import { useState } from 'react';

const LoadingProjects = () => {

  const [loads, setLoads] = useState<Array<number>>([0,0,0])

  return (
    <div className="flex flex-col gap-4 overflow-y-auto overscroll-contain max-h-[50vh] px-2 pt-2">
     {
      loads.map((i) => {
        return (
            <div key={i + '' + Math.random()} className="flex flex-row w-full px-4 py-3 cursor-pointer rounded-lg justify-between items-center duration-200 animate-pulse rounded-md bg-[#202C34]/10">
                <div className="invisible">'placeholder'</div>
                <button className="btn normal-case invisible" >
                  Edit
                </button>
            </div>
          )
        })
      }
      </div>
  )
}

export default LoadingProjects