import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';

import Textblock from './Textblock';
import Original from './Original';
import Screenshot from './Screenshot';

const Column = ({ user, projectId, index, items, setItems, obj, setDragging }:any) => {


  const [moved, setMoved] = useState<number | null>(null)
  const [movedOver, setMovedOver] = useState<number | null>(null)
  const [varDragging, setVarDragging] = useState<boolean>(false)

  const dragOver = (moveFrom:number, moveTo:number) => {

    const ref = [...items]
    let _vars = [...ref[index].variations]

    const moved = _vars.splice(moveFrom, 1)
    _vars = _vars.slice(0, moveTo).concat(moved).concat(_vars.slice(moveTo))

    ref[index].variations = _vars

    setItems(ref)
  }

  const onDragStart = (e:DragEvent, index:number) => {
    if (e.target?.id === 'drag-variation') {
      setMoved(index)
      setVarDragging(true)
    }
  }

  const addVar = (e:any) => {
    e.preventDefault()
    const _items = [...items]

    _items[index].variations.push({
      text: '',
      starred: false,
    })

    setItems(_items)
  }

  const startDrag = (e:DragEvent) => {
    e.preventDefault()
    setDragging(true)

  }

  const onDragOver = (e:DragEvent, index:number) => {
    if (varDragging) {
      setMovedOver((curr) => index)
    }
  }

  useEffect(() => {
    dragOver(moved, movedOver)
    setMoved((curr) => movedOver)
  }, [movedOver])

  const onDragEnd = (e:DragEvent) => {
    e.preventDefault()
    setDragging(false)
    setVarDragging(false)
  }

  return (

    <div className="flex flex-col gap-3 p-2">
      <Screenshot user={user} projectId={projectId} items={items} setItems={setItems} xIndex={index} />
      {
        obj.variations.map((vari:object, yIndex:number) => {
          if (yIndex === 0) {

            return (
              <Original key={'var' + yIndex}
                moved={moved} xIndex={index} yIndex={yIndex} setItems={setItems} items={items} obj={obj}
                onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd} varDragging={varDragging}
              />
            )
          } else {
            return (
              <Textblock key={'var' + yIndex}
                moved={moved} xIndex={index} yIndex={yIndex} setItems={setItems} items={items}
                onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd} varDragging={varDragging}
              />
            )
          }
        })
      }
      <button className="bg-gray-200 py-2 rounded-lg" onClick={addVar}>+</button>
    </div>
  )
}

export default Column
