import { useState, useEffect } from 'react'

import Logo from '../assets/logo2.png'

const NavBar = ({ navRef }) => {

  return (
    <div ref={navRef} className="flex flex-row w-full h-[8vh] min-h-[50px] bg-[#FBF5EC] z-[4] top-0 max-h-[60px] fixed flex flex-row items-center px-5 justify-between">
      <div className="flex flex-row ">
        <img src={Logo} className="w-[40px]" />
      </div>
      <div className="flex flex-row  ">
        center
      </div>
      <div className="flex flex-row ">
        <button className="bg-[#65D072] border-2 border-[#1C1E21]/90 rounded-full px-4 py-2" >Log out</button>
      </div>
    </div>
  )

}

export default NavBar