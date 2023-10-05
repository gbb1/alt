/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useRef, useContext } from 'react';
import {
 useLocation
} from 'react-router-dom';
import { useNavigate } from 'react-router';

import { MdOutlineDragIndicator } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'

import { useGetProject } from '../hooks/getProject';
import { onAuthStateChanged } from 'firebase/auth';

import LoadingColumns from '../components/LoadingColumns';

import { ref, deleteObject } from "firebase/storage";
import { storage } from '../../firebaseConfig'

import { ProjectContext } from '../context/mainProject';
import { ItemsContext } from '../context/itemsContext';
// import { SavingContext } from '../context/savingContext';

import { auth } from '../../firebaseConfig'


import Column from '../components/Column';
import { useSaveProject } from '../hooks/saveProject';

const Project = () => {

  const location = useLocation();
  //@ts-ignore
  const [update, setUpdate] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (location.state === null) navigate('/');
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });
  }, [])

  // @ts-ignore
  const { project_id, email } = location.state;

  const { project, loading } = useGetProject(email, project_id, update);

  const [items, setItems] = useState<Array<any>>([])
  const [dragging, setDragging] = useState<boolean>(false)

    // @ts-ignore
    const { saving, saveError } = useSaveProject(email, project_id, items);

  const dragged = useRef(null)

  const [moved, setMoved] = useState<null | number>(null)
  const [movedOver, setMovedOver] = useState<null | number>(null)

  // @ts-ignore
  const { mainProject, setMainProject } = useContext(ProjectContext)
   // @ts-ignore
  const { mainItems, setMainItems } = useContext(ItemsContext)

  const canvasRef = useRef(null)

  useEffect(() => {
     // @ts-ignore
    setItems(project.data)
    setMainProject(project)
  }, [project])

  useEffect(() => {
    return () => {
      setMainItems([])
      setMainProject({})
    }
  }, [])

  useEffect(() => {
    setMainItems(items)
  }, [items])



  const [selected, setSelected] = useState<null | number>(null)


  const handleDelete = (e:React.MouseEvent<HTMLElement>, index:number) => {
    e.preventDefault()

    const _items = [...items]
    const old = _items.splice(index, 1)
     // @ts-ignore
    const path = old[0].path

    if (path) {
      const oldRef = ref(storage, path);
       // @ts-ignore
      if (path?.length > 0) {
        deleteObject(oldRef)
        .then(() => {
          console.log('deleted')
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
    setItems(_items)

  }


  const dragOver = (moveFrom:null | number, moveTo:null | number) => {
    if (moveFrom === null || moveTo === null) return
    // @ts-ignore
    setItems((curr) => {
      let _items = [...curr]

      const dragged = _items.splice(moveFrom, 1)
      _items = _items.slice(0, moveTo).concat(dragged).concat(_items.slice(moveTo))
      return _items
    })
  }

  const onDragStart = (e:DragEvent, index:number) => {
     // @ts-ignore
    if (e.target.id==='drag-column') {
      setMoved(index)
      setDragging(true)
    }
  }

  const onDragOver = (_e:DragEvent, index:number) => {
    if (dragging) {
      setMovedOver((_curr) => index)
    }
  }

  const handleClick = (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const _items = [...items]
     // @ts-ignore
    _items.push({
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

    // console.log('lenght1,',_items.length)
    setSelected(_items.length - 1)
     // @ts-ignore
    setItems(_items)
  }

  useEffect(() => {
    console.log('moved', moved, 'movedover', movedOver)
    dragOver(moved, movedOver)
    setMoved((_curr) => movedOver)
    setSelected((_curr) => movedOver)
  }, [movedOver])

  const onDragEnd = (e:any) => {
    e.preventDefault()
    setDragging(false)
  }

  return (
    <div className="relative">
      <div ref={canvasRef} className="flex flex-row gap-4 w-max ml-[.5%] pt-10 absolute left-0 justify-start px-10 pb-20">
        {
          loading
          ? <LoadingColumns />
          : items && items.map((x:object, index:number) => {
              return (
                <div key={'column' + index} className="w-min" onClick={() => setSelected(index)}>
                  <div
                    id={`drag-column`}
                    className={`
                      cursor-move
                      bg-[#1C1E21]/90
                      p-2
                      rounded-md
                      ${ index === moved && dragging ? 'border-2 border-[#65D072] translate-x-0 translate-y-0 mx-2 transition-all' : ''}
                    `}

                    draggable
                     // @ts-ignore
                    onDragStart={(e) => onDragStart(e, index)}
                     // @ts-ignore
                    onDragEnter={(e) => onDragOver(e, index)}
                    onDragEnd={onDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    ref={dragged}
                  >
                    <div className="w-full flex justify-between items-center p-1 gap-5 relative min-h-[40px] ">
                      <div
                      id='dragger'
                      className="hidden md:block rotate-90 flex w-min dark:text-[#1C1E21]/90 h-min bg-gray-200 rounded-sm py-2 px-1 z-[3] absolute right-[45%]"
                      >
                        <MdOutlineDragIndicator />
                      </div>
                      <div className='text-white flex dark:text-[#1C1E21]/90 cursor-pointer ml-auto absolute right-[5%] bg-gray-400 p-1 rounded-full hover:bg-gray-200' onClick={(e) => handleDelete(e, index)}>
                        <IoClose />
                      </div>
                    </div>
                    <Column
                      //@ts-ignore
                      user={email} projectId={project_id} index={index} items={items} setItems={setItems} sentence={x.variations[0]} obj={x} selected={selected} dragging={dragging} setDragging={setDragging} onDragStart={onDragStart} />
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
          className="dark:text-[#1C1E21]/90 hover:bg-gray-200 transition-all w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-[1000px] flex flex-row items-center justify-center bg-[#65D072] border-2 border-[#1C1E21]/90"
        >
          +
        </button>
      }
      </div>
    </div>
  )
}

export default Project
