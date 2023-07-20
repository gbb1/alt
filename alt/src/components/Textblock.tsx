import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';

import { IoClose } from 'react-icons/io5'


const Textblock = ({ xIndex, yIndex, sentence, items, setItems, onDragStart, onDragEnd, onDragOver }:any) => {

  const [input, setInput] = useState('')

  const handleChange = (e) => {
    e.preventDefault()

    let ref = [...items]
    ref[xIndex].variations[yIndex] = e.target.value

    setItems(ref)
  }

  const deleteVar = (e) => {
    e.preventDefault()

    let ref = [...items]
    let variations = ref[xIndex].variations

    variations.splice(yIndex, 1)

    ref[xIndex].variations = variations
    setItems(ref)

  }

  const addVar = (e) => {
    e.preventDefault()
    let ref = [...items]

    ref[xIndex].variations.push('')

    setItems(ref)
  }

  return (
      <div
        className={`cursor-pointer max-w-[300px] bg-gray-200 rounded-md active:opacity-75 active:z-[3] w-min h-min p-1 inset-0 top-0`}
        draggable
        id={`drag-variation`}
        onDragStart={onDragStart}
        onDragEnter={onDragOver}
        onDragEnd={onDragEnd}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-row p-1 items-center justify-between">
          <div
            className="self-center text-xs"
          >line {xIndex}, alt {yIndex}</div>
          <div
            onClick={deleteVar}
            className="bg-gray-100 rounded-[100%] p-1"
          >
            <IoClose value={{ color: 'white' }} />
          </div>
        </div>
        <div className="flex flex-col items-start p-3 m-1 relative h-min">
          <textarea
            placeholder='hello'
            value={sentence}
            className='p-3 min-w-full min-h-full max-w-full min-h-[10px] h-full w-full rounded-sm z-[1] absolute top-0 left-0'
            onChange={handleChange}
            style={{resize: 'both'}}
          >
          </textarea>

          <div
            className={`border-2 min-w-[200px] w-full max-w-full min-h-[10px] p-3 bg-white rounded-sm m-0 text-left opacity-0`}
            style={{ marginLeft: `${0}%`}}
            id={'input' + xIndex}
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {sentence}
          </div>
        </div>
      </div>
  )
}

export default Textblock
