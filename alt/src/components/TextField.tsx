import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';

import { IoClose } from 'react-icons/io5'


const TextField = ({ state, handleChange, xIndex, id }:any) => {

  console.log('textField:', state)

  return (

        <div className="flex flex-col items-start p-3 m-1 relative h-min">
          <textarea
            id={id}
            placeholder='hello'
            value={state}
            className='p-3 min-w-full max-h-[300px] min-h-full max-w-full min-h-[10px] h-full w-full rounded-sm z-[1] absolute top-0 left-0'
            onChange={handleChange}
            style={{resize: 'none'}}
          >
          </textarea>

          <div
            className={`border-2 min-w-[200px] w-full max-w-full min-h-[10px] p-3 bg-white rounded-sm m-0 text-left opacity-0`}
            style={{ marginLeft: `${0}%`}}
            id={'input' + xIndex}
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {state.replaceAll(' ','0')}
          </div>
        </div>
  )
}

export default TextField