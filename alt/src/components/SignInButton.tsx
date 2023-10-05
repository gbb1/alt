
import { useNavigate } from 'react-router';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth } from '../../firebaseConfig'


import { AiFillGoogleCircle } from 'react-icons/ai'

import { createUser } from '../../db/projects'


const LoginButton = () => {

  const navigate = useNavigate();

  const signInWithGoogle = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        createUser(response.user.email)
          .then(() => {
            navigate('/');
          })
          .catch(() => {
            console.log('err')
          })
      })
      .catch((err) => {
        console.log(err);
      })
    signInWithRedirect(auth, new GoogleAuthProvider());
  }

  return (
    <button
      type="submit"
      className=""
      onClick={signInWithGoogle} >
        <div className="btn gap-2 dark:text-[#1C1E21]/90 text-sm normal-case flex flex-row bg-[#65D072] border-2 border-[#1C1E21]/90 rounded-full px-4">
          <AiFillGoogleCircle /> Sign in with Google
        </div>
    </button>
  )
}

export default LoginButton