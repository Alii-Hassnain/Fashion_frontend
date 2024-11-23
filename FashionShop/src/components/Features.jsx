import React from 'react'
import { FeaturesData } from './Links'

const Features = () => {
  return (
    <div className='align-elements grid grid-cols-4 gap-3 mt-4 '>
        {
            FeaturesData.map((features)=>{
                const {id,title,desc,img} = features
                return(
                    <div key={id} 
                    className='bg-slate-600 p-4 justify-center hover:bg-gray-400 text-white w-full h-36 rounded-md flex flex-col cursor-pointer'>
                        <img src={img} alt={img} />
                        <h2>{title}</h2> 
                        <p>{desc}</p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Features