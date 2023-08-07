/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import Col1 from '../assets/col1.png'
import Col2 from '../assets/col2.png'
import Col3 from '../assets/col3.png'

import './module.css'


const Module2 = ({ isVisible }:any) => {

  const [show1, setShow1] = useState<boolean>(false)
  const [show2, setShow2] = useState<boolean>(false)
  const [show3, setShow3] = useState<boolean>(false)

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setShow1(true)
      }, 200)

      setTimeout(() => {
        setShow2(true)
      }, 600)

      setTimeout(() => {
        setShow3(true)
      }, 1000)
    }
  }, [isVisible])

  return (

    <div className="overflow-y-auto mx-10">
      <div className="flex-col justify-center">

        <div className={`p-10 rounded-lg flex flex-row flex-wrap lg:flex-nowrap gap-10 ${ isVisible ? '' : 'invisible'}`}>
          <div className="flex flex-col gap-2 lg:gap-5 justify-center w-full lg:max-w-[50%]">
            <h1 className={`text-4xl lg:text-6xl pl-10 text-[#65D072] font-bold ${ show1 ? 'fade-in-delay2' : 'invisible'}`}>alt. is built for your workflow</h1>
            <div className={`py-2 pl-20 mt-5 lg:mt-5 text-2xl lg:text-3xl font-light text-[#1C1E21]/90 flex flex-row gap-2 text-left lg:text-left w-full ${ show1 ? 'fade-in-delay2' : 'invisible'}`}>
              • Quickly create variations of content and add a screenshot for reference.
            </div>
            <div className={`py-2 pl-20 w-full text-2xl lg:text-3xl font-light text-[#1C1E21]/90 flex flex-row gap-2 text-left lg:text-left w-full  ${ show2 ? 'fade-in-delay2' : 'invisible'}`}>
              • Drag and drop your variations or star your favorites to quickly organize your process.            </div>
            <div className={`py-2 pl-20 text-2xl lg:text-3xl font-light text-[#1C1E21]/90 flex flex-row gap-2 text-left lg:text-left w-full ${ show3 ? 'fade-in-delay2' : 'invisible'}`}>
              • Export your work to a csv so you can ship it or make changes in a spreadsheet.
            </div>

          </div>
          <div className="flex flex-row gap-5 items-center">

            <div className={`pt-10 ${show1 ? 'swipeRight' : 'invisible'}`}>
              <img src={Col1} className="rounded-lg w-min "/>
            </div>

            <div className={`pt-5 ${show2 ? 'swipeRight' : 'invisible'}`}>
              <img src={Col2} className="rounded-lg"/>
            </div>

            <div className={`${show3 ? 'swipeRight fade-in-delay0' : 'invisible'}`}>
              <img src={Col3} className="rounded-lg"/>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default Module2