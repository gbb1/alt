/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from 'react';

const LoadingMain = () => {

  // const [loads, setLoads] = useState<Array<number>>(new Array(size).fill(0))

  return (
    <div className="w-full h-full flex flex-row justify-center">
     <span className="loading loading-dots loading-lg -translate-y-40"></span>
    </div>
  )
}

export default LoadingMain