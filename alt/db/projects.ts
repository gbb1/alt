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
    data: [{
      color: 'blue',
      sentence: '',
      variations: [{
        text: '',
        starred: false,
      }],
      translation_string: {
        show: false,
        text: '',
      },
      ui_component: {
        show: false,
        text: '',
      },
    }],
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

const getProject = async (userId:string, projectId:number) => {

  const hash = MD5(userId).toString();
  const userRef = doc(db, 'users', hash);
  const userSnap = await getDoc(userRef);

  projectId = Number(projectId)

  return new Promise((resolve, reject) => {

    if (!userSnap.exists()) {
      reject()
    }

    const data = userSnap.data()
    for (let proj of data.projects) {
      if (proj.id === projectId) {
        resolve(proj)
      }
    }
    reject()

  })

}

const saveProject = async (userId:string, projectId:string, projData:object) => {
  const hash = MD5(userId).toString();
  const userRef = doc(db, 'users', hash);
  const userSnap = await getDoc(userRef);

  const intId = Number(projectId)

  return new Promise((resolve, reject) => {

    if (!userSnap.exists()) {
      reject()
    }

    const data = {...userSnap.data()}
    for (const proj of data.projects) {
      if (proj.id === intId) {
        proj.data = projData
      }
    }
    console.log(projData)

    setDoc(userRef, data, { merge: true })
      .then(() => {
        resolve(projData)
      })
      .catch((err) => {
        reject(err)
      })

  })
}


export {
  createUser,
  addProject,
  getProjects,
  getProject,
  saveProject,
}
