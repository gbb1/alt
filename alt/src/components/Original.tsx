/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';

import { FaCircleMinus } from 'react-icons/fa6'
import { FaCirclePlus } from 'react-icons/fa6'

import TextField from './TextField';


const Original = ({ moved, xIndex, yIndex, obj, items, setItems, onDragStart, onDragEnd, onDragOver, varDragging }:any) => {

  const content = useMemo(() => {
    return items[xIndex].variations[yIndex].text
  }, [xIndex, yIndex, items])

  const handleShow = (e:React.MouseEvent<HTMLElement>, key:string) => {
    e.preventDefault()
    const _items = [...items]
    _items[xIndex][key].show = !_items[xIndex][key].show
    setItems(_items)
  }

  const handleAltInput = (e:React.ChangeEvent<HTMLInputElement>, key:string) => {
    e.preventDefault()

    const _items = [...items]
    _items[xIndex][key].text = e.target.value

    setItems(_items)
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const _items = [...items]
    _items[xIndex].variations[yIndex].text = e.target.value

    setItems(_items)
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
            className="self-center text-xs dark:text-[#1C1E21]/90"
          >string {xIndex}, alt {yIndex}</div>
          <div className="flex flex-row">
          </div>
        </div>
        <TextField state={content} handleChange={handleChange} xIndex={xIndex} id={''} />
        <div>
        <div className="flex flex-row justify-between items-center">
          <div className="py-2 text-xs w-max rounded-sm ml-1 dark:text-[#1C1E21]/90">UI component:</div>
            <div className="dark:text-[#1C1E21]/90" id="ui_component"  onClick={(e) => handleShow(e, 'ui_component')}>
              {
                obj.ui_component.show
                ? <FaCircleMinus />
                : <FaCirclePlus />
              }
            </div>
          </div>
          {
            obj.ui_component.show
            ? <TextField state={obj.ui_component.text} handleChange={(e:any) => handleAltInput(e, 'ui_component')} xIndex={xIndex} id={'ui_component'} />
            : null
          }
        </div>
        <div>
          <div className="flex flex-row justify-between items-center">
            <div className="py-2 text-xs w-max rounded-sm ml-1 dark:text-[#1C1E21]/90">Translation info:</div>
            <div className="dark:text-[#1C1E21]/90" id="translation_string" onClick={(e) => handleShow(e, 'translation_string')}>
              {
                obj.translation_string.show
                ? <FaCircleMinus />
                : <FaCirclePlus />
              }
            </div>
          </div>
          {
            obj.translation_string.show
            ? <TextField state={obj.translation_string.text} handleChange={(e:any) => handleAltInput(e, 'translation_string')} xIndex={xIndex} id={'translation_string'} />
            : null
          }
        </div>

      </div>
  )
}

export default Original
