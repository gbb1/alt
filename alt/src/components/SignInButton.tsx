/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useNavigate } from 'react-router';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../../firebaseConfig'


// import { AiFillGoogleCircle } from 'react-icons/ai'

import { createUser } from '../../db/projects'

const LoginButton = () => {

  const navigate = useNavigate();

  // const signInWithGoogle = async (e:React.MouseEvent<HTMLButtonElement>) => {
  //   // e.preventDefault();

  //   try {

  //     signInWithPopup(auth, new GoogleAuthProvider())
  //       .then((response) => {
  //         createUser(response.user.email)
  //           .then(() => {
  //             navigate('/');
  //           })
  //           .catch(() => {
  //             console.log('err')
  //           })
  //       })
  //       .catch(() => {
  //         alert('Firebase error, working on a fix :)')
  //       })
  //     } catch (e) {
  //       alert((e as Error).message)
  //     }
  // }

  const navToDemo = (e:React.MouseEvent<HTMLButtonElement>) => {
    console.log('running')
    e.preventDefault();
    createUser('demo@gmail.com')
      .then((result) => {
        console.log(result)
        navigate('/demo');
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <button
        type="button"
        className=""
        //@ts-ignore
        onClick={navToDemo} >
          <div className="btn gap-2 dark:text-[#1C1E21]/90 text-sm normal-case flex flex-row bg-[#65D072] border-2 border-[#1C1E21]/90 rounded-full px-4">
            {/* <AiFillGoogleCircle /> Sign in with Google */}
            Try demo
          </div>
      </button>
    </>
  )
}

export default LoginButton

/*

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
*/