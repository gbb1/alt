import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';

import { IoClose } from 'react-icons/io5'

import TextField from './TextField';


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
        className={`cursor-pointer max-w-[300px] bg-[#F0F2F5] rounded-md w-full h-min p-1 inset-0 top-0`}
        draggable
        id={`drag-variation`}
        onDragStart={(e) => onDragStart(e, yIndex)}
        onDragEnter={(e) => onDragOver(e, yIndex)}
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
        <TextField state={sentence} handleChange={handleChange} xIndex={xIndex} />
      </div>
  )
}

export default Textblock
