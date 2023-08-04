
import { useState, useEffect } from 'react'

import './module.css'

const Module4 = ({ isVisible }) => {

  const [subject, setSubject] = useState<string>('Let\'s connect 👋');
  const [message, setMessage] = useState<string>('');

  const [show1, setShow1] = useState<boolean>(false)
  const [show2, setShow2] = useState<boolean>(false)
  const [show3, setShow3] = useState<boolean>(false)

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setShow1(true)
      }, 500)

    }
  }, [isVisible])

  const handleInput = (event:React.ChangeEvent<HTMLElement>) => {
    event.preventDefault();
    const actions = {
      'subject': () => setSubject(event.target.value),
      'message': () => setMessage(event.target.value),
    }
    actions[event.target.id]();
  }

  return (

    <div className={`bg-[#1C1E21]/90 p-10 rounded-lg min-h-[60vh] flex flex-row flex-wrap items-center gap-10 lg:flex-nowrap justify-between mx-10 mt-5 mb-10 ${show1 ? 'fade-in-delay0' : 'invisible'}`}>

        <div className="flex flex-col">
          <h1 className="text-6xl text-[#65D072] font-bold w-full">
            Thanks for taking a look!
          </h1>
          <div className="py-6 text-3xl text-[#FBF5EC] flex flex-row gap-2">alt. is a project editor built for the Content Design process, from ideation to organization to translation.</div>
          <div className="py-6 text-xl text-[#FBF5EC] flex flex-row gap-2">Original design, inspired by WhatsApp web.</div>

        </div>

        <div className="p-4 md:p-6 w-full max-w-[50%] ">
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
                    <textarea onChange={handleInput} id="message" rows="6" className="block p-2.5 w-full text-[12px] md:text-sm text-gray-900 bg-[#FBF5EC] rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="We'd make a great team..."></textarea>
                </div>

                <button
                  type="submit"
                  className="self-end "
                  >
                    <div className="btn gap-2 text-sm normal-case flex flex-row bg-[#65D072] border-2 border-[#1C1E21]/90 rounded-full px-4">
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