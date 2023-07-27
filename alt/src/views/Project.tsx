import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import {
  BrowserRouter as Router, Link, Route, Routes,
} from 'react-router-dom';
import { auth } from '../../firebaseConfig'

import { MdOutlineDragIndicator } from 'react-icons/md'
import { BiSolidHide, BiSolidShow } from 'react-icons/bi'

import Draggable from 'react-draggable'

import Column from '../components/Column';

const Project = () => {

  const test = ['blue','green','red','pink','purple','yellow','gray','cyan','orange']
  const ref = []
  ref.push({
    color: 'blue',
    sentence: '',
    variations: [''],
  })

  // const [positions, setPositions] = useState<object>({})
  const [items, setItems] = useState<[]>(ref)
  const [dragging, setDragging] = useState<boolean>(false)

  const moveRef = useRef<any>(null)
  const moveOverRef = useRef<any>(null)
  const dragged = useRef<any>(null)

  const [moved, setMoved] = useState(null)
  const [movedOver, setMovedOver] = useState(null)

  // const [varMoved, setVarMoved] = useState(null)
  // const [varMovedOver, setVarMovedOver] = useState(null)
  // const [varDragging, setVarDragging] = useState(false)

  const [selected, setSelected] = useState(null)

  const handleSort = () => {

    const [moveFrom, moveTo] = [moveRef.current, moveOverRef.current]

    const _items:[] = [...items]

    const draggedItemContent = _items.splice(moved, 1)[0]

    _items.splice(movedOver, 0, draggedItemContent)

    setItems(_items)

    moveRef.current = null
    moveOverRef.current = null

  }

  const reorderItems = (moveFrom:number, moveTo:number) => {
    // const ref:[] = items;
    // const moved:any = ref.splice(moveFrom, 1)[0];
    // ref.splice(moveTo, 0, moved);
    // console.log(ref);
    setItems(curr => {
      const ref = curr
      const moved = ref.splice(moveFrom, 1)[0];
      ref.splice(moveTo, 0, moved)
      console.log(ref)
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
    let index = Math.floor(Math.random() * (test.length))

    ref.push({
      color: test[index],
      sentence:'',
      variations: [''],
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

  // useEffect(() => {
  //   console.log(moveOverRef.current)
  // }, [moveOverRef])

  // useEffect(() => {
  //   console.log(selected)
  // }, [selected])


  return (
    <div className="">
      {/* Project: */}
      <div className="flex flex-row flex-wrap gap-4 w-max max-w-[95%] ml-[5%] absolute left-0 top-[15%] justify-start px-10 pb-20">
        {
          items.map((x:object, index:number) => {
            return (
              <div key={index} className="" onClick={() => setSelected(index)}>
                <div
                  id={`drag-column`}
                  className={`
                    cursor-move
                    bg-[#1C1E21]/90
                    p-2
                    rounded-md
                  `}
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  onDragEnter={(e) => onDragOver(e, index)}
                  onDragEnd={onDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  ref={dragged}
                >
                  <div className="w-full flex-row flex justify-center items-center p-1">
                    <div
                    id='dragger'
                    className="rotate-90 w-min h-min bg-gray-200 rounded-sm py-2 px-1 z-[3]"
                    >
                      <MdOutlineDragIndicator />
                    </div>
                  </div>
                  <Column index={index} items={items} setItems={setItems} color={x.color} sentence={x.variations[0]} selected={selected} dragging={dragging} setDragging={setDragging} onDragStart={onDragStart} />
                </div>
              </div>
            )
          })
        }
      <button
        onClick={handleClick}
        className="w-[40px] h-[40px] rounded-[1000px] flex flex-row items-center justify-center bg-[#65D072]"
      >
        +
      </button>
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
