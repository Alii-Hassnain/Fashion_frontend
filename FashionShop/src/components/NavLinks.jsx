import { NavLink } from "react-router-dom";
import React from 'react'
import { Link } from "react-router-dom";
import { Links } from "./Links";

const NavLinks = () => {
  return (
    <nav>  
      <ul className='flex flex-row justify-center gap-8'>
        {
          Links.map((navStuff)=>{
            const {id,navLink,toLink} = navStuff;
            return(
              <li key={id}>
                <NavLink to = {toLink}>{navLink}</NavLink>
              </li>
            )
          })
        }
      </ul>
      
    </nav>
  )
}

export default NavLinks

