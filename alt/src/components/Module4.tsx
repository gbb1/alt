/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useState, useEffect } from 'react'
import Profile from '../assets/profile.png'

import './module.css'

const Module4 = ({ isVisible }:any) => {

  const [subject, setSubject] = useState<string>('Let\'s connect 👋');
  const [message, setMessage] = useState<string>('');

  const [show1, setShow1] = useState<boolean>(false)

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setShow1(true)
      }, 500)

    }
  }, [isVisible])

  const handleInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.target.id === 'subject') {
      setSubject(event.target.value)
    }
    if (event.target.id === 'message') {
      setMessage(event.target.value)
    }
  }

  return (

    <div className={`bg-[#1C1E21]/90 p-6 md:p-10 rounded-lg min-h-[60vh] flex flex-row flex-wrap items-center gap-4 md:gap-10 lg:flex-nowrap justify-between mx-4 md:mx-10 mt-5 mb-0 ${show1 ? 'fade-in-delay0' : 'invisible'}`}>

        <div className="flex flex-col">
          <img src={Profile} className="rounded-full h-[20%] w-[20%] border-4 border-white my-2" />
          <h1 className="text-2xl md:text-6xl text-[#65D072] font-bold w-full">
            Thanks for taking a look!
          </h1>
          <div className="py-2 md:py-6 text-sm md:text-3xl text-[#FBF5EC] flex flex-row gap-2">I'm Gabe, a full stack engineer with a background in Stats and Linguistics, and professional experience as a Content Designer</div>
          <div className="py-2 md:py-6 text-sm md:text-3xl text-[#FBF5EC] flex flex-row gap-2 flex flex-row flex-wrap">If you enjoyed this project, add me on <a className="text-[#6590D0] hover:text-[#65D072]" href='https://www.linkedin.com/in/gabriel-bennett-brandt/'>Linkedin</a> or check out my <a className="text-[#6590D0] hover:text-[#65D072]" href='https://gbb1.github.io/portfolio/'>portfolio</a></div>
          <div className="py-2 md:py-6 text-sm md:text-3xl text-[#FBF5EC] flex flex-row gap-2"></div>
        </div>

        <div className="p-0 md:p-6 w-full lg:max-w-[50%] ">
            <div className="font-normal text-3xl text-[#65D072] mt-2 mb-3 md:mb-6 ">
              Get in touch
            </div>
            <form action="#" className="space-y-5 flex flex-col ">
                <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-[#65D072]">Subject</label>
                    <input onChange={handleInput}  type="text" id="subject" className="block p-3 w-full text-[12px] md:text-sm text-gray-900 bg-[#FBF5EC] rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#65D072] dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" value="Let's connect 👋" required />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-[#65D072]">Your message</label>
                    <textarea
                      //@ts-ignore
                      onChange={handleInput} id="message" rows="6" className="block p-2.5 w-full text-[12px] md:text-sm text-gray-900 bg-[#FBF5EC] rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="We'd make a great team..."></textarea>
                </div>

                <button
                  type="submit"
                  className="self-end "
                  >
                    <div className="btn gap-2 dark:text-[#1C1E21]/90 text-sm normal-case flex flex-row bg-[#65D072] border-2 border-[#1C1E21]/90 rounded-full px-4">
                      <a href = {`mailto:gbennettbrandt@gmail.com?subject=${subject}&body=${message}`}>
                        Send message
                      </a>
                    </div>
                </button>
            </form>
        </div>
      </div>

  )
}

export default Module4