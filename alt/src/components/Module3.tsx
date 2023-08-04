import { useEffect, useState } from 'react';

import './module.css'


const Module3 = ({ isVisible }) => {

  const [show1, setShow1] = useState<boolean>(false)
  const [show2, setShow2] = useState<boolean>(false)
  const [show3, setShow3] = useState<boolean>(false)

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setShow1(true)
      }, 100)

      setTimeout(() => {
        setShow2(true)
      }, 500)

      setTimeout(() => {
        setShow3(true)
      }, 1000)
    }
  }, [isVisible])

  return (

    <div className="h-min mx-10 relative my-20">
      <div className="flex-col justify-center">

        <div className={`p-10 rounded-lg flex flex-col items-center py-20 ${ isVisible ? '' : 'invisible'}`}>

          <h1 className={`text-6xl text-[#65D072] font-bold z-[2] max-w-[70%] text-left lg:text-center ${ show1 ? 'fade-in-delay2' : 'invisible'}`}>So... what is Content Design?</h1>
          <div className={`py-6 text-2xl font-light  z-[2] text-[#1C1E21]/90 flex flex-row gap-2 text-left lg:text-left max-w-[70%] ${ show2 ? 'fade-in-delay2' : 'invisible'}`}>Content Designers bring empathy and clarity to every word you see on screen so that UI can be effective, appropriate, and engaging.   </div>
          <div className={`text-2xl font-light text-[#1C1E21]/90 z-[2]  flex flex-row gap-2 text-left lg:text-right max-w-[70%] ${ show2 ? 'fade-in-delay2' : 'invisible'}`}>They use tools like tone, vocabulary level, and iconography to make UI accessible, scalable, and consistent. </div>
          <div className={`py-6 text-2xl font-light text-[#1C1E21]/90  z-[2]  flex flex-row gap-2 text-left lg:text-left max-w-[70%] ${ show3 ? 'fade-in-delay2' : 'invisible'}`}>And they touch everything from titles, to buttons, tooltips, and terms and conditions.</div>

        </div>

        <div className={`${ show3 ? 'fade-in-delay1' : 'invisible'}`}>
          <div className={`w-[80%] rounded-lg h-[90%] md:h-[80%] bg-[#1C1E21]/10 z-[1] lg:invisible transition-all absolute top-[5vh] md:top-[10%] left-[10%] ${ show3 ? 'fade-in-delay1' : 'invisible'}`}></div>
        </div>

        <div className={`${ show3 ? 'fade-in-delay1' : 'invisible'}`}>
          <div className={`absolute btn rounded-full bg-gray-/5 normal-case font-light hover:text-white cursor-pointer text-[#1C1E21]/90 top-[20%] left-[5%] z-[0] `}>Get started</div>
        </div>

        <div className={`${ show3 ? 'fade-in-delay1' : 'invisible'}`}>
          <div className={`absolute btn rounded-full bg-gray-/5 normal-case font-light hover:text-white line-through cursor-pointer text-[#1C1E21]/90 bottom-40 right-10 z-[0] ${ show2 ? 'fade-in-delay1' : 'invisible'}`}>Click me to continue</div>
        </div>

        <div className={`${ show1 ? 'fade-in-delay1' : 'invisible'}`}>
          <div className={`absolute btn rounded-full bg-gray-/5 normal-case font-light hover:text-white line-through cursor-pointer text-[#1C1E21]/90 top-[70%] left-[2%] z-[0] ${ show1 ? 'fade-in-delay1' : 'invisible'}`}>Do this</div>
        </div>

        <div className={`${ show2 ? 'fade-in-delay1' : 'invisible'}`}>
          <div className={`absolute btn rounded-full bg-gray-/5 normal-case font-light hover:text-white  cursor-pointer text-[#1C1E21]/90 top-2 right-[60%] z-[0] ${ show1 ? 'fade-in-delay1' : 'invisible'}`}>Let's go</div>
        </div>

        <div className={`${ show1 ? 'fade-in-delay1' : 'invisible'}`}>
          <div className={`absolute btn rounded-full bg-gray-/5 normal-case font-light hover:text-white cursor-pointer text-[#1C1E21]/90 bottom-10 left-[55%] z-[0] ${ show3 ? 'fade-in-delay1' : 'invisible'}`}>Try it out</div>
        </div>

        <div className={`${ show2 ? 'fade-in-delay1' : 'invisible'}`}>
          <div className={`absolute btn rounded-full bg-gray-/5 normal-case font-light hover:text-white cursor-pointer text-[#1C1E21]/90 top-[3%] right-20 z-[0] ${ show3 ? 'fade-in-delay1' : 'invisible'}`}>Start now</div>
        </div>

        <div className={`${ show2 ? 'fade-in-delay1' : 'invisible'}`}>
          <div className={`absolute btn rounded-full bg-gray-/5 normal-case font-light hover:text-white cursor-pointer text-[#1C1E21]/90 bottom-[5%] left-[25%] z-[0] ${ show2 ? 'fade-in-delay1' : 'invisible'}`}>Learn more</div>
        </div>

      </div>
    </div>

  )
}

export default Module3