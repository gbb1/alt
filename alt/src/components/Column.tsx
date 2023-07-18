import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';



import Draggable from 'react-draggable'

const Column = ({ index, items, setItems, color, sentence }:any) => {

  const [input, setInput] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    console.log('trigged')
    let ref = [...items]
    ref[index].sentence = e.target.value
    // if (div) ref[index].sentence = e.target.textContent
    setItems(ref)
  }

  // const handleClick = (e) => {
  //   e.preventDefault()
  //   let id = 'input' + index
  //   let ref = [...items]
  //   ref[index].sentence = e.target.value
  //   if (div) ref[index].sentence = e.target.textContent
  //   setItems(ref)
  // }

  // useEffect(() => {
  //   const target = document.getElementById('input' + index)

  //   // Create an observer instance.
  //   const observer = new MutationObserver(function(mutations) {
  //       console.log(target.innerText);
  //   });

  //   // Pass in the target node, as well as the observer options.
  //   observer.observe(target, {
  //       attributes:    true,
  //       childList:     true,
  //       characterData: true
  //   });
  // }, [])

  return (
    // <Draggable
    //   key={index}
    //   position={{ x: x, y: y}}
    //   onDrag={handleDrag}
    //   onStop={endHandler}
    // >
    <div className="">
      <div className={`cursor-pointer max-w-[300px] bg-gray-200 rounded-lg active:opacity-75 active:z-[3] w-min h-min p-1 inset-0 top-0`}>
        <div>{color}</div>
        <div className="flex flex-col items-start p-3 m-3 relative h-min border-black border-2">
          <textarea
            placeholder='hello'
            value={sentence}
            className='p-3 min-w-full min-h-full max-w-full min-h-[10px] h-full w-full rounded-md z-[1] absolute top-0 left-0'
            onChange={handleChange}
            style={{resize: 'none'}}
          >
          </textarea>

          <div
            className={`border-2 min-w-[200px] w-full max-w-full min-h-[10px] p-3 bg-white rounded-md m-0 text-left opacity-0`}
            style={{ marginLeft: `${0}%`}}
            id={'input' + index}
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {sentence}
          </div>

        </div>

      </div>
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