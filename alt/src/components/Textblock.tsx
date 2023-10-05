/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';

import { IoClose } from 'react-icons/io5'
import { FaStar, FaRegStar, FaClone } from 'react-icons/fa6'

import TextField from './TextField';


const Textblock = ({ moved, xIndex, yIndex, items, setItems, onDragStart, onDragEnd, onDragOver, varDragging }:any) => {

  // console.log('items', items)

  const content = useMemo(() => {
    return items[xIndex].variations[yIndex].text
  }, [xIndex, yIndex, items])



  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log('running handle change')
    e.preventDefault()

    const _items = [...items]
    _items[xIndex].variations[yIndex].text = e.target.value
    setItems(_items)
  }

  const handleClone = (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const _items = [...items]
    _items[xIndex].variations[yIndex].text = _items[xIndex].variations[0].text
    setItems(_items)
  }

  const deleteVar = (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const _items = [...items]
    const variations = _items[xIndex].variations

    variations.splice(yIndex, 1)

    _items[xIndex].variations = variations
    setItems(_items)

  }

  const handleStar = (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const _items = [...items]

    _items[xIndex].variations[yIndex].starred = !_items[xIndex].variations[yIndex].starred
    setItems(_items)
  }

  return (
      <div
        className={`cursor-pointer max-w-[300px] bg-[#F0F2F5] rounded-md w-full h-min p-1 inset-0 top-0 ${moved === yIndex && varDragging ? 'border-2 border-[#65D072] translate-x-0 translate-y-0 my-2 transition-all' : ''}`}
        draggable
        id={`drag-variation`}
        onDragStart={(e) => onDragStart(e, yIndex)}
        onDragEnter={(e) => onDragOver(e, yIndex)}
        onDragEnd={onDragEnd}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-row p-1 items-center justify-between">
          <div
            className="self-center text-xs dark:text-[#1C1E21]/90"
          >string {xIndex}, alt {yIndex}</div>
          <div className="flex flex-row">
            <div
              className="bg-gray-100 rounded-[100%] p-1 dark:text-[#1C1E21]/90"
              onClick={handleClone}
            >
              <FaClone />
            </div>
            <div
              className="dark:text-[#1C1E21]/90 bg-gray-100 rounded-[100%] p-1 "
              onClick={handleStar}
            >
              {
                items[xIndex].variations[yIndex].starred
                ? <FaStar value={{ color: 'blue' }} />
                : <FaRegStar value={{ color: 'blue' }} />

              }
            </div>
            <div
              onClick={deleteVar}
              className="bg-gray-100 rounded-[100%] p-1 dark:text-[#1C1E21]/90"
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
