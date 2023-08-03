import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

import { FaCircleMinus } from 'react-icons/fa6'
import { FaCirclePlus } from 'react-icons/fa6'

import TextField from './TextField';


const Original = ({ moved, xIndex, yIndex, obj, items, setItems, onDragStart, onDragEnd, onDragOver, varDragging }:any) => {

  const content = useMemo(() => {
    return items[xIndex].variations[yIndex].text
  }, [items[xIndex].variations[yIndex].text])

  const handleShow = (e, key) => {
    e.preventDefault()
    const ref = [...items]
    ref[xIndex][key].show = !ref[xIndex][key].show
    setItems(ref)
  }

  const handleAltInput = (e, key) => {
    e.preventDefault()

    let ref = [...items]
    // console.log('va', ref[xIndex])
    ref[xIndex][key].text = e.target.value

    setItems(ref)
  }

  const handleChange = (e) => {
    e.preventDefault()

    let ref = [...items]
    ref[xIndex].variations[yIndex].text = e.target.value

    setItems(ref)
  }

  return (
      <div
        className={`cursor-pointer max-w-[300px] bg-[#65D072] rounded-md w-full h-min p-1 inset-0 top-0 flex flex-col gap-2 ${moved === yIndex && varDragging ? 'border-2 border-[#1C1E21]/90 translate-x-0 translate-y-0' : ''}`}
        draggable
        id={`drag-variation`}
        onDragStart={(e) => onDragStart(e, yIndex)}
        onDragEnter={(e) => onDragOver(e, yIndex)}
        onDragEnd={onDragEnd}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-row p-2 items-center justify-between">
          <div
            className="self-center text-xs"
          >string {xIndex}, alt {yIndex}</div>
          <div className="flex flex-row">
            {/* test */}
          </div>
          {/* <div
            onClick={deleteVar}
            className="bg-gray-100 rounded-[100%] p-1"
          >
            <IoClose value={{ color: 'white' }} />
          </div> */}
        </div>
        <TextField state={content} handleChange={handleChange} xIndex={xIndex} id={''} />
        <div>
        <div className="flex flex-row justify-between items-center">
          <div className="py-2 text-xs w-max rounded-sm ml-1">UI component:</div>
            <div className="" id="ui_component"  onClick={(e) => handleShow(e, 'ui_component')}>
              {
                obj.ui_component.show
                ? <FaCircleMinus />
                : <FaCirclePlus />
              }
            </div>
          </div>
          {
            obj.ui_component.show
            ? <TextField state={obj.ui_component.text} handleChange={(e) => handleAltInput(e, 'ui_component')} xIndex={xIndex} id={'ui_component'} />
            : null
          }
        </div>
        <div>
          <div className="flex flex-row justify-between items-center">
            <div className="py-2 text-xs w-max rounded-sm ml-1">Translation info:</div>
            <div className="" id="translation_string" onClick={(e) => handleShow(e, 'translation_string')}>
              {
                obj.translation_string.show
                ? <FaCircleMinus />
                : <FaCirclePlus />
              }
            </div>
          </div>
          {
            obj.translation_string.show
            ? <TextField state={obj.translation_string.text} handleChange={(e) => handleAltInput(e, 'translation_string')} xIndex={xIndex} id={'translation_string'} />
            : null
          }
        </div>

      </div>
  )
}

export default Original
