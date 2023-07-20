import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';

import Textblock from './Textblock';

import { MdOutlineDragIndicator } from 'react-icons/md'

// import { Trie } from '../Trie.ts'


import Draggable from 'react-draggable'

const Column = ({ index, items, setItems, color, sentence, selected, dragging, setDragging }:any) => {


  const [moved, setMoved] = useState(null)
  const [movedOver, setMovedOver] = useState(null)
  const [varDragging, setVarDragging] = useState(false)

  const dragOver = (moveFrom, moveTo) => {

    const ref = [...items]
    const _vars = [...ref[index].variations]

    const temp = _vars[moveFrom]
    _vars[moveFrom] = _vars[moveTo]
    _vars[moveTo] = temp

    ref[index].variations = _vars

    setItems(ref)
  }


  const onDragStart = (e, index) => {
    // console.log(e)
    console.log(e.target.id)
    if (e.target.id==='drag-variation') {
      setMoved(index)
      setVarDragging(true)
    }
  }

  const addVar = (e) => {
    e.preventDefault()
    let ref = [...items]
    // ref[index].variations.push({
    //   index: ref[index].variations.length + 1,
    //   var: ''
    // })
    ref[index].variations.push('')
    // if (div) ref[index].sentence = e.target.textContent
    setItems(ref)
  }

  const startDrag = (e) => {
    e.preventDefault()
    setDragging(true)
    console.log('dragging')
  }

  const onDragOver = (e, index) => {
    console.log('firing')
    if (varDragging) {
      setMovedOver((curr) => index)
    }
  }

  useEffect(() => {
    dragOver(moved, movedOver)
    setMoved((curr) => movedOver)
    // setSelected((curr) => movedOver)
  }, [movedOver])

  const onDragEnd = (e) => {
    e.preventDefault()
    setDragging(false)
  }

  return (

    <div className="flex flex-col gap-3 p-2">
      {/* <div
        id='dragger'
        className="rotate-90 w-min h-min z-[3]"
      >
        <MdOutlineDragIndicator />
      </div> */}
      <Textblock xIndex={index} yIndex={0} sentence={sentence} items={items} setItems={setItems} />
      {
        selected === index
        ?
        items[index].variations.slice(1).map((vari, yIndex) => {
            return (
              <Textblock
                xIndex={index} yIndex={yIndex + 1} setItems={setItems} items={items} sentence={vari}
                onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}
              />
              // <div
              //   className="bg-black w-full h-[40px]"
              // >alt {index}

              // </div>
            )
          })
        : null
      }
      <button onClick={addVar}>+</button>
    </div>
    // </Draggable>
  )
}

export default Column


/*

                  <Draggable
                    key={`user${user.user_id}`}
                    position={{ x: x, y: y }}
                    onDrag={dragHandler}
                    onStop={upHandler}
                    axis="x"
                  >
                    <div
                      id="test"
                      key={`user${user.user_id}`}
                      className={`profile-card
                        ${out === user.user_id ? 'unmount' : ''}
                        ${pass === user.user_id ? 'pass-unmount' : ''}
                        ${front === user.user_id ? 'mount' : ''}
                        ${back === user.user_id ? 'back-mount' : ''}
                        ${index === 0 ? 'back' : ''}
                      `}
                    >
                      <div className="card-wrapper">
                        <ProfileCard user={user} distance={distances[user.location]} />
                      </div>
                    </div>
                  </Draggable>


                  */



  // const [startX, setStartX] = useState<number>(0)
  // const [startY, setStartY] = useState<number>(0);
  // const [x, setX] = useState(0);
  // const [y, setY] = useState(0);

  // const [moveTo, setMoveTo] = useState<number>(index)

  // useEffect(() => {
    //   if (columnRef.current) {
      //     setStartX(columnRef.current.offsetLeft)
      //     setStartY(columnRef.current.offsetTop)

      //     const posObj = positions;
      //     // posObj[index] = { left: columnRef.current.offsetLeft, right: columnRef.current.offsetLeft + columnRef.current.offsetWidth }
      //     posObj[columnRef.current.offsetLeft] = index
      //     setPositions(posObj)
      //   }
      // }, [])

      // const handleDrag = (e, ui) => {
        //   const { x, y } = ui
        //   const windowX = x + startX;

        //   setMoveTo(coordinateToIndex(windowX))

        //   setX(x)
        //   setY(y)
        // }



  // const endHandler = () => {
  //   reorderItems(index, moveTo);
  //   setX(x)
  //   setY(0)
  // }