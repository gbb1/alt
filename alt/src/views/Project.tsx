import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import {
  BrowserRouter as Router, Link, Route, Routes, useLocation
} from 'react-router-dom';
import { auth } from '../../firebaseConfig'

import { MdOutlineDragIndicator } from 'react-icons/md'
import { BiSolidHide, BiSolidShow } from 'react-icons/bi'

import { getProject, saveProject } from '../../db/projects';
import { useGetProject } from '../hooks/getProject';
import { useSaveProject } from '../hooks/saveProject';

import html2canvas from 'html2canvas'
import LoadingColumns from '../components/LoadingColumns';

import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, getMetadata } from "firebase/storage";
import { storage } from '../../firebaseConfig'

import { useAuthState } from 'react-firebase-hooks/auth';


import Column from '../components/Column';

const Project = () => {

  // const user = auth.currentUser

  const location = useLocation();
  const [update, setUpdate] = useState(false)
  const { project_id, email } = location.state;

  const { project, loading, error } = useGetProject(email, project_id, update);

  const [items, setItems] = useState<[]>([])
  const [dragging, setDragging] = useState<boolean>(false)

  const moveRef = useRef<any>(null)
  const moveOverRef = useRef<any>(null)
  const dragged = useRef<any>(null)

  const [moved, setMoved] = useState(null)
  const [movedOver, setMovedOver] = useState(null)

  // const user = 'test@gmail.com'

  const canvasRef = useRef(null)

  const { saving, saveError } = useSaveProject(email, project_id, items, false)

  useEffect(() => {
    setItems(project.data)
  }, [project])

  // useEffect(() => {
  //   console.log('items',items)
  // }, [items])

  // useEffect(() => {
  //   console.log(saving)
  // }, [saving])
  // const [varMoved, setVarMoved] = useState(null)
  // const [varMovedOver, setVarMovedOver] = useState(null)
  // const [varDragging, setVarDragging] = useState(false)

  const [selected, setSelected] = useState(null)


  useEffect(() => {
    console.log(loading)
  }, [loading])
  // useEffect(() => {
  //   const saveTimer = setInterval(saveUpdates, 5000); // Save updates every 5 seconds

  //   // Cleanup the timer on unmount
  //   return () => clearInterval(saveTimer);
  // }, []);

  // const saveUpdates = () => {
  //   const data = [...items]
  //   console.log('data', data)
  //   console.log('items in saver', items)
  //   saveProject('test@gmail.com', project_id, data)
  //     .then(() => {
  //       console.log('saved')
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  const [test, setTest] = useState(null)

  const takeScreenShot = () => {
    const element = canvasRef.current
    if (!element) return
    html2canvas(element).then((canvas) => {
      let image = canvas.toDataURL('image/jpeg')
      setTest(image)

    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleSort = () => {

    const [moveFrom, moveTo] = [moveRef.current, moveOverRef.current]

    const _items:[] = [...items]

    const draggedItemContent = _items.splice(moved, 1)[0]

    _items.splice(movedOver, 0, draggedItemContent)

    setItems(_items)

    moveRef.current = null
    moveOverRef.current = null

  }

  const handleDelete = (e, index) => {
    e.preventDefault()

    const _items = [...items]
    const old = _items.splice(index, 1)

    console.log('old', old)
    const path = old[0].path

    const oldRef = ref(storage, path);
    setItems(_items)
    deleteObject(oldRef)
      .then(() => {
        console.log('deleted')
      })
      .catch((err) => {
        console.log(err)
      })


  }

  const reorderItems = (moveFrom:number, moveTo:number) => {
    setItems(curr => {
      const ref = curr
      const moved = ref.splice(moveFrom, 1)[0];
      ref.splice(moveTo, 0, moved)

      return ref
    });
  }


  const dragOver = (moveFrom, moveTo) => {

    let _items = [...items]

    const moved = _items.splice(moveFrom, 1)
    _items = _items.slice(0, moveTo).concat(moved).concat(_items.slice(moveTo))

    // const temp = _items[moveFrom]
    // _items[moveFrom] = _items[moveTo]
    // _items[moveTo] = temp

    setItems(_items)
  }


  const onDragStart = (e, index) => {
    // console.log(e)
    // console.log(e.target.id)
    if (e.target.id==='drag-column') {
      moveRef.current = index
      setMoved(index)
      setDragging(true)
    }
  }

  // useEffect(() => {
  //   const element = document.getElementById('drag-' + moved)

  //   if (element?.classList.contains('border-2')) {
  //     element?.classList.remove('border-2')
  //   } else {
  //     element?.classList.remove('border-2')
  //   }


  //   // setTimeout(function(){
  //   //   // e.target.style.visibility = "hidden";
  //   //   // e.target.classList.add('border-2')
  //   //   // e.target.classList.add('p-0')
  //   // }, 0);
  // }, [moved])

  const onDragOver = (e, index) => {
    if (dragging) {
      moveOverRef.current = index
      setMovedOver((curr) => index)
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    let ref = [...items]
    // let index = Math.floor(Math.random() * (test.length))

    ref.push({
      // color: test[index],
      sentence:'',
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
    })
    setSelected(ref.length - 1)
    setItems(ref)
  }

  useEffect(() => {
    dragOver(moved, movedOver)
    setMoved((curr) => movedOver)
    setSelected((curr) => movedOver)
  }, [movedOver])

  const onDragEnd = (e) => {
    e.preventDefault()
    setDragging(false)
  }

  // if (loading) return <div className="mt-[100px] w-full flex ">...</div>

  return (
    <div className="">
      {/* Project: */}
      {/* <div className="h-[8vh] w-full min-h-[50px]"></div> */}
      {/* <button onClick={takeScreenShot}>Test</button> */}
      {/* <img src={test} /> */}
      <div ref={canvasRef} className="flex flex-row gap-4 min-w-max max-w-[95%] ml-[.5%] pt-10 absolute left-0 justify-start px-10 pb-20">
        {
          loading
          ? <LoadingColumns />
          : items.map((x:object, index:number) => {
              return (
                <div key={'column' + index} className="w-min" onClick={() => setSelected(index)}>
                  <div
                    id={`drag-column`}
                    className={`
                      cursor-move
                      bg-[#1C1E21]/90
                      p-2
                      rounded-md
                      ${ index === moved && dragging ? 'border-2 border-[#65D072] translate-x-0 translate-y-0' : ''}
                    `}
                    // border-[#65D072]
                    draggable
                    onDragStart={(e) => onDragStart(e, index)}
                    onDragEnter={(e) => onDragOver(e, index)}
                    onDragEnd={onDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    ref={dragged}
                  >
                    <div className="w-full flex justify-between items-center p-1 gap-5">
                      <div
                      id='dragger'
                      className="rotate-90 flex w-min h-min bg-gray-200 rounded-sm py-2 px-1 z-[3]"
                      >
                        <MdOutlineDragIndicator />
                      </div>
                      <div className='text-white flex cursor-pointer ml-auto' onClick={(e) => handleDelete(e, index)}>x</div>
                    </div>
                    <Column user={email} projectId={project_id} index={index} items={items} setItems={setItems} color={x.color} sentence={x.variations[0]} obj={x} selected={selected} dragging={dragging} setDragging={setDragging} onDragStart={onDragStart} />
                  </div>
                </div>
              )
            })
        }
      {
        loading
        ? null
        : <button
          onClick={handleClick}
          className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-[1000px] flex flex-row items-center justify-center bg-[#65D072] border-2 border-[#1C1E21]/90"
        >
          +
        </button>
      }
      </div>
    </div>
  )
}

export default Project


/*

                    ${ index === moveOverRef.current
                        ? moveRef.current > index
                          ? ''
                          : ''
                        : ''
                    }
                    ${
                      index === moveRef.current
                      ? ''
                      : ''
                    }


*/
