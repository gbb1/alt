import { useState, useEffect } from 'react'

const NavBar = ({ navRef }) => {

  return (
    <div ref={navRef} className="flex flex-row w-full h-[8vh] min-h-[40px] bg-[#FBF5EC] z-[4] top-0 max-h-[60px] fixed flex flex-row items-center px-5 justify-between">
      <div className="flex flex-row ">
        left
      </div>
      <div className="flex flex-row  ">
        center
      </div>
      <div className="flex flex-row ">
        right
      </div>
    </div>
  )

}

export default NavBar