import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import {
  BrowserRouter as Router, Link, Route, Routes,
} from 'react-router-dom';
import { auth } from '../../firebaseConfig'

import Draggable from 'react-draggable'

import Column from '../components/Column';

const Project = () => {

  const test = ['blue','green','red','pink','purple','yellow','gray','cyan','orange']
  const ref = []
  ref.push({
    color: 'blue',
    sentence: '',
  })
  // for (const item of test) {
  //   ref.push({
  //     color: item,
  //     sentence: '',
  //   })
  // }

  const [positions, setPositions] = useState<object>({})
  const [items, setItems] = useState<[]>(ref)

  const moveRef = useRef<any>(null)
  const moveOverRef = useRef<any>(null)
  const dragged = useRef<any>(null)

  const [moved, setMoved] = useState(null)
  const [movedOver, setMovedOver] = useState(null)

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

  // useEffect(() => {
  //   console.log(items)
  //   // reorderItems(0, 4)
  //   console.log(items);
  // }, [items])

  const dragOver = (moveFrom, moveTo) => {

    const _items = [...items]

    const temp = _items[moveFrom]
    _items[moveFrom] = _items[moveTo]
    _items[moveTo] = temp


    // const draggedItemContent = _items.splice(moveFrom, 1)[0]

    // _items.splice(moveTo, 0, draggedItemContent)

    setItems(_items)
    // moveRef.current = moveFrom
  }

  const coordinateToIndex = (x:number) => {
    let i = 0;
    const keys = Object.keys(positions);

    while (Number(keys[i]) < x) {
      i++;
    }

    return i;
  }

  const onDragStart = (e, index) => {
    moveRef.current = index
    setMoved(index)
  }

  useEffect(() => {
    const element = document.getElementById('drag-' + moved)

    if (element?.classList.contains('border-2')) {
      element?.classList.remove('border-2')
    } else {
      element?.classList.remove('border-2')
    }


    setTimeout(function(){
      // e.target.style.visibility = "hidden";
      // e.target.classList.add('border-2')
      // e.target.classList.add('p-0')
    }, 0);
  }, [moved])

  const onDragOver = (e, index) => {
    moveOverRef.current = index
    setMovedOver((curr) => index)
  }

  const handleClick = (e) => {
    e.preventDefault()
    let ref = [...items]
    let index = Math.floor(Math.random() * (test.length))

    console.log(index)
    ref.push({
      color: test[index],
      sentence:'',
    })
    setItems(ref)
  }

  useEffect(() => {
    dragOver(moved, movedOver)
    setMoved((curr) => movedOver)
  }, [movedOver])

  const onDragEnd = (e) => {
    // handleSort()
    // e.target.style.visibility = "visible";
    // e.target.classList.remove('border-2')
    // e.target.classList.remove('`)
  }

  useEffect(() => {
    console.log(moveOverRef.current)
  }, [moveOverRef])

  // useEffect(() => {
  //   dragOver(moveRef.current, movedOver)
  // }, [movedOver])

  return (
    <div>
      Project:
      <div className="flex flex-row gap-4">
        {
          items.map((x:object, index:number) => {
            return (
              <div key={index} >
                <div
                  id={`drag-${index}`}
                  className={`
                    cursor-move
                  `}
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  onDragEnter={(e) => onDragOver(e, index)}
                  onDragEnd={onDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  ref={dragged}
                >
                  <Column index={index} items={items} setItems={setItems} color={x.color} sentence={x.sentence} />
                </div>
              </div>
            )
          })
        }
      <button onClick={handleClick}>
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
