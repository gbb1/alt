import React, { useEffect, useState, useRef } from 'react';

const LoadingColumns = ({ size }) => {

  size = size || 3
  const [loads, setLoads] = useState<Array<number>>(new Array(size).fill(0))

  return (
    <div className="flex flex-row gap-4 w-full max-w-[95%] ml-[.5%] absolute left-0 justify-start px-10 pb-20">
     {
      loads.map((i) => {
        return (
          <div  key={i + '' + Math.random()}>
            <div className="h-[60vh] w-[330px] duration-200 animate-pulse rounded-md bg-[#1C1E21]/10" />
          </div>
          )
        })
      }
    </div>
  )
}

export default LoadingColumns