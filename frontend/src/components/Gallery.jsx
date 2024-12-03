import React, { useState } from 'react'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img5.jpeg'
import img6 from '../assets/img6.jpeg'
import img7 from '../assets/img7.jpeg'
const obj={
title:"Trip To Manali",
description:"Manali trip adventerureous full of excitement and energy.Adventerous tracking and sky-diving",
images:[img4,img5,img6,img7,img4,img5,img6,img7,img4,img5]
}
const Gallery = () => {
  const [gallery,setGallery]=useState([obj,obj,obj,obj]);
  return (
    <div className='my-2'>
      <div>
        {
          gallery.map((item,index)=>{
            return(
              <>
              <div className='p-2 text-center bg-slate-50 '>
                <h1 className='text-2xl font-bold'>{item.title}</h1>
                <p>{item.description}</p>
                <div className='flex flex-wrap gap-2 justify-center mt-3'>
                  {
                    item.images.map((image,index)=>{
                     return  <img className='w-[18%]' key={index} src={image} alt="" />
                    })
                  }
                </div>

              </div>
              <hr className='my-4' />
              </>
            
            )
          })
        }
      </div>
    </div>
  )
}

export default Gallery