import { db, storage } from '../firebaseConfig'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { MD5 } from 'crypto-js';

const createUser = async (email:string | null) => {
  if (!email) return
  const userData = {
    email: email,
    count: 0,
    projects: [],
  }

  const hash = MD5(email).toString();
  const userRef = doc(db, 'users', hash);
  const userSnap = await getDoc(userRef);


  if (!userSnap.exists()) {
    setDoc(userRef, userData, { merge: true })
      .then(() => {
        // console.log('written');
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

const addProject = async (userId:string) => {

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
    const index = data.count + 1

    // console.log('creating project', data.count, index)

    project.id = index
    project.name = 'Project ' + index
    data.projects.push(project)
    data.count = data.count + 1

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
  // console.log('requesting', userId, hash)
  const userRef = doc(db, 'users', hash);
  const userSnap = await getDoc(userRef);


  return new Promise((resolve, reject) => {

    if (!userSnap.exists()) {
      reject()
    }

    const data = userSnap.data()

    if (data === undefined) reject()
    else {
      resolve(data.projects)
    }

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
    if (data === undefined) reject()
    else {
      for (const proj of data.projects) {
        if (proj.id === projectId) {
          resolve(proj)
        }
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
        proj.accessed = new Date()
        proj.data = projData
      }
    }

    setDoc(userRef, data, { merge: true })
      .then(() => {
        resolve(projData)
      })
      .catch((err) => {
        reject(err)
      })

  })
}

const updateName = async (userId:string, projectId:string, name:string) => {

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
        if (proj.id === name) resolve(name)
        proj.accessed = new Date()
        proj.name = name
      }
    }

    setDoc(userRef, data, { merge: true })
      .then(() => {
        resolve(name)
      })
      .catch((err) => {
        reject(err)
      })

  })
}


const deleteProject = async (userId:string, projectId:string) => {

  const hash = MD5(userId).toString();
  const userRef = doc(db, 'users', hash);
  const userSnap = await getDoc(userRef);

  const intId = Number(projectId)

  return new Promise((resolve, reject) => {

    if (!userSnap.exists()) {
      reject()
    }

    const data = {...userSnap.data()}
    let target = null


    for (let i = 0; i < data.projects.length; i++) {
      const proj = data.projects[i]

      if (proj.id === intId) {
        [target] = data.projects.splice(i, 1);
        break;
      }
    }

    if (!target) reject('mismatch id id:' + projectId + '.')

    const promises = []

    for (const col of target.data) {
      // console.log(col.path)
      if (!('path' in col) || col.path.length === 0) continue;
      const deleteImg = new Promise((resolve, reject) => {
        const oldRef = ref(storage, col.path);
        deleteObject(oldRef).then(() => (resolve)).catch((err) => reject(err))
      })
      promises.push(deleteImg)
    }

    Promise.all(promises).then(() => {
      return setDoc(userRef, data, { merge: true })
    })
    .then(() => {
      resolve('deleted')
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
  updateName,
  deleteProject,
}
