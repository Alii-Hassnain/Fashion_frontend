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
                    className='bg-slate-200 p-4 justify-center
                     hover:bg-gray-400 text-black w-full h-36 rounded-md 
                     flex flex-col cursor-pointer
                     items-center
                     '>
                        <div className='h-10 w-10 mb-3'>
                        <img src={img} alt={img} />
                        </div>
                        <h2>{title}</h2> 
                    </div>
                )
            })
        }
    </div>
  )
}

export default Features