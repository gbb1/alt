import { useEffect, useState, useRef, useContext } from 'react';
import {
 useLocation
} from 'react-router-dom';

import { MdOutlineDragIndicator } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'

import { useGetProject } from '../hooks/getProject';
import { useSaveProject } from '../hooks/saveProject';

import LoadingColumns from '../components/LoadingColumns';

import { ref, deleteObject } from "firebase/storage";
import { storage } from '../../firebaseConfig'

import { ProjectContext } from '../context/mainProject';
import { ItemsContext } from '../context/itemsContext';
import { SavingContext } from '../context/savingContext';


import Column from '../components/Column';

const Project = () => {

  const location = useLocation();
  const [update, setUpdate] = useState<boolean>(false)

  const { project_id, email, size } = location.state;

  const { project, loading, error } = useGetProject(email, project_id, update);

  const [items, setItems] = useState<[]>([])
  const [dragging, setDragging] = useState<boolean>(false)

  const moveRef = useRef(null)
  const moveOverRef = useRef(null)
  const dragged = useRef(null)

  const [moved, setMoved] = useState<null | number>(null)
  const [movedOver, setMovedOver] = useState<null | number>(null)

  const { mainProject, setMainProject } = useContext(ProjectContext)
  const { mainItems, setMainItems } = useContext(ItemsContext)
  const { mainSaving, setMainSaving } = useContext(SavingContext)

  const canvasRef = useRef(null)

  const { saving, saveError } = useSaveProject(email, project_id, items, false)

  useEffect(() => {
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

  // useEffect(() => {
  //   console.log('saving')
  //   if (saving && !mainSaving) {
  //     setMainSaving(true)
  //   }

  //   if (!saving) {
  //     setMainSaving(false)
  //   }
  // }, [saving])


  const [selected, setSelected] = useState<null | number>(null)


  const handleDelete = (e:React.MouseEvent<HTMLElement>, index:number) => {
    e.preventDefault()

    const _items = [...items]
    const old = _items.splice(index, 1)

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


  const dragOver = (moveFrom:number, moveTo:number) => {

    let _items = [...items]

    const moved = _items.splice(moveFrom, 1)
    _items = _items.slice(0, moveTo).concat(moved).concat(_items.slice(moveTo))

    setItems(_items)
  }


  const onDragStart = (e:DragEvent, index:number) => {
    if (e.target.id==='drag-column') {
      moveRef.current = index
      setMoved(index)
      setDragging(true)
    }
  }

  const onDragOver = (e:DragEvent, index:number) => {
    if (dragging) {
      moveOverRef.current = index
      setMovedOver((curr) => index)
    }
  }

  const handleClick = (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const _items = [...items]

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

    setSelected(_items.length - 1)
    setItems(_items)
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

  return (
    <div className="relative">
      <div ref={canvasRef} className="flex flex-row gap-4 w-max ml-[.5%] pt-10 absolute left-0 justify-start px-10 pb-20">
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
                      ${ index === moved && dragging ? 'border-2 border-[#65D072] translate-x-0 translate-y-0 mx-2 transition-all' : ''}
                    `}

                    draggable
                    onDragStart={(e) => onDragStart(e, index)}
                    onDragEnter={(e) => onDragOver(e, index)}
                    onDragEnd={onDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    ref={dragged}
                  >
                    <div className="w-full flex justify-between items-center p-1 gap-5 relative min-h-[40px] ">
                      <div
                      id='dragger'
                      className="rotate-90 flex w-min h-min bg-gray-200 rounded-sm py-2 px-1 z-[3] absolute right-[45%]"
                      >
                        <MdOutlineDragIndicator />
                      </div>
                      <div className='text-white flex cursor-pointer ml-auto absolute right-[5%] bg-gray-400 p-1 rounded-full hover:bg-gray-200' onClick={(e) => handleDelete(e, index)}>
                        <IoClose />
                      </div>
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
          className="hover:bg-gray-200 transition-all w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-[1000px] flex flex-row items-center justify-center bg-[#65D072] border-2 border-[#1C1E21]/90"
        >
          +
        </button>
      }
      </div>
    </div>
  )
}

export default Project
