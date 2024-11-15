import React from 'react'
import { Link } from 'react-router-dom'
import { FaChevronDown } from "react-icons/fa";

const Header = () => {

  return (
    <header className='bg-neutral py-2 text-neutral-content'>
      <div className='align-elements flex justify-center sm:justify-start'>
        
      </div>
      <div className='align-elements flex justify-center sm:justify-between'>

        {/* left */}
        <div className='flex gap-2'>
          
            <div className="dropdown">
            <div tabIndex={0} role="button" className="mt-1">
              <div className='flex flex-row gap-1'>
                <p className='link-hover text-sm'>Currency</p>
                <FaChevronDown className='mt-1' />
              </div>
            </div>
              <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow">
                <li><a>PKR</a></li>
                <li><a>USD</a></li>
              </ul>
            </div>

        </div>

        {/* right */}
        <div className='flex gap-5'>
          <Link to={"/login"}>
            <p className='link-hover text-sm'>Log in</p>
          </Link>
          <Link to={"/register"}>
            <p className='link-hover text-sm'>Register</p>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header