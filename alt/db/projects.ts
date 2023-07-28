import { db } from '../firebaseConfig'
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { MD5 } from 'crypto-js';

const createUser = async (email:string) => {
  const userData = {
    email: email,
    projects: [],
  }

  const hash = MD5(email).toString();
  const userRef = doc(db, 'users', hash);
  const userSnap = await getDoc(userRef);


  if (!userSnap.exists()) {
    setDoc(userRef, userData, { merge: true })
      .then(() => {
        console.log('written');
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

const addProject = async (userId) => {

  const hash = MD5(userId).toString();
  const userRef = doc(db, 'users', hash);
  const userSnap = await getDoc(userRef);

  const project = {
    id: '',
    data: [],
    accessed: new Date(),
    name: '',
  }

  if (!userSnap.exists()) return

  return new Promise((resolve, reject) => {

    const data = userSnap.data()
    const index = data.projects.length

    project.id = index + 1
    data.projects.push(project)

    setDoc(userRef, data, { merge: true })
      .then(() => {
        resolve(project)
      })
      .catch((err) => {
        reject(err)
      })

  })

}

const getProjects = async (userId:string) => {

  const hash = MD5(userId).toString();
  const userRef = doc(db, 'users', hash);
  const userSnap = await getDoc(userRef);


  return new Promise((resolve, reject) => {

    if (!userSnap.exists()) {
      reject()
    }

    const data = userSnap.data()
    resolve(data.projects)

  })

}

export {
  createUser,
  addProject,
  getProjects
}
