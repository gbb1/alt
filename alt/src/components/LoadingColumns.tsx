import React, { useEffect, useState, useRef } from 'react';

const LoadingColumns = () => {

  const [loads, setLoads] = useState([0,0,0])

  useEffect(() => {

    // const interval = setInterval(() => {
    //   setLoads((curr) => {
    //     if (curr.length <= 4) {
    //       return curr.concat(0)
    //     } else {
    //       return []
    //     }
    //   })
    // }, 300)

    // const addLetter = () => {


    //   for (let i = 0; i < 1000; i++) {
    //     setTimeout(() => {
    //       setLoads((curr) => {
    //         if (curr.length <= 4) {
    //           return curr.concat(0)
    //         } else {
    //           return []
    //         }
    //       });
    //     }, i * 400);
    //   }
    // };

    // addLetter()
    // return () => clearInterval(interval)
    // if (!!flag) addLetter();
  }, []);

  return (
    <div className="flex flex-row gap-4 w-full max-w-[95%] ml-[.5%] absolute left-0 justify-start px-10 pb-20">
     {
      loads.map((i) => {
        return (
          <div>
            <div key={i + '' + Math.random()} className="h-[60vh] w-[330px] duration-200 animate-pulse rounded-md bg-[#1C1E21]/10" />
          </div>
          )
        })
      }
    </div>
  )
}

export default LoadingColumns