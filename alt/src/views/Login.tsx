/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../../firebaseConfig'

import LoginButton from '../components/SignInButton';
import Module2 from '../components/Module2';
import Module3 from '../components/Module3';
import Module4 from '../components/Module4';


const Login = () => {

  const navigate = useNavigate()
  const [user, setUser] = useState<object | null>(null)

  const [mod2Vis, setMod2Vis] = useState<boolean>(false)
  const [mod3Vis, setMod3Vis] = useState<boolean>(false)

  const handleVisible = useCallback((callback:any) => {
    callback(true)
  }, [])

  const module2Ref = useRef(null)
  const module3Ref = useRef(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    });
  }, [])

  useEffect(() => {
    const options1 = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    };

    const options2 = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    };

    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleVisible(setMod2Vis);
          observer2.unobserve(entry.target);
        }
      });
    }, options1);

    const observer3 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleVisible(setMod3Vis);
          observer3.unobserve(entry.target);
        }
      });
    }, options2);

    if (module2Ref.current) {
      observer2.observe(module2Ref.current);
    }

    if (module3Ref.current) {
      observer3.observe(module3Ref.current);
    }

    return () => {
      observer2.disconnect();
      observer3.disconnect();
    };
  }, [handleVisible]);


  const handleNav = (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="overflow-y-auto mx-10 mt-5">

        <div className="flex-col-reverse lg:flex-row-reverse gap-20">
          <div className="bg-[#1C1E21]/90 p-10 rounded-lg min-h-[60vh] flex flex-col justify-center">
            <h1 className="text-8xl text-[#65D072] font-bold w-[90%] ">Figma, Google docs, and Trello walk into a bar...</h1>
            <div className="py-6 text-3xl text-[#FBF5EC] flex flex-row gap-2">alt. is a project editor built for the Content Design process, from ideation to organization to translation.</div>

            <div className="mt-8">
              {
                user
                ? <button
                  type="submit"
                  className=""
                  onClick={handleNav} >
                    <div className="btn gap-2 text-sm normal-case flex flex-row bg-[#65D072] border-2 border-[#1C1E21]/90 rounded-full px-4">
                      Let's go
                    </div>
                </button>
                : <LoginButton />
              }
            </div>
          </div>
        </div>
      </div>
      <div ref={module2Ref} className={`${mod2Vis ? '' : 'invisible'}`}>
        <Module2 isVisible={mod2Vis} />
      </div>
      <div ref={module3Ref} className={`${mod3Vis ? '' : 'invisible'}`}>
        <Module3 isVisible={mod3Vis} />
      </div>
      <div className={`${mod3Vis ? '' : 'invisible'}`}>
        <Module4 isVisible={mod3Vis} />
      </div>
      <div className="w-full py-6 mb-6 text-xl text-[#1C1E21]/90 flex flex-row gap-2 items-center justify-center">Original design, inspired by WhatsApp web.</div>
    </div>

  )
}

export default Login