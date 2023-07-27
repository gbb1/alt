import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

import { IoClose } from 'react-icons/io5'
import { FaStar, FaRegStar } from 'react-icons/fa6'

import TextField from './TextField';


const Textblock = ({ moved, xIndex, yIndex, items, setItems, onDragStart, onDragEnd, onDragOver }:any) => {

  const content = useMemo(() => {
    return items[xIndex].variations[yIndex].text
  }, [items[xIndex].variations[yIndex].text])

  const handleChange = (e) => {
    e.preventDefault()

    let ref = [...items]
    ref[xIndex].variations[yIndex].text = e.target.value
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

    ref[xIndex].variations.push({
      text: '',
      starred: false,
    })

    setItems(ref)
  }

  return (
      <div
        className={`cursor-pointer max-w-[300px] bg-[#F0F2F5] rounded-md w-full h-min p-1 inset-0 top-0 `}
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
          <div className="flex flex-row">
            <div
              className="bg-gray-100 rounded-[100%] p-1"
            >
              <FaStar value={{ color: 'blue' }} />
            </div>
            <div
              onClick={deleteVar}
              className="bg-gray-100 rounded-[100%] p-1"
            >
              <IoClose value={{ color: 'white' }} />
            </div>

          </div>
        </div>
        <TextField state={content} handleChange={handleChange} xIndex={xIndex} />
      </div>
  )
}

export default Textblock
