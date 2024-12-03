import React, { useState } from "react";
import { Link } from "react-router-dom";
import Img2 from "../assets/Img2.JPG";
const UploadGallery = () => {
  const [selectedImage,setSelectedImage]=useState([]);

   

  const onChangeHandle=(event)=>{
  const files=Array.from(event.target.files);
  const validfiles=files.filter((file)=>file.type.startsWith('image/')||file.type.startsWith('video/'))
  if(validfiles){
    const filePreview=validfiles.map((file)=>(
      {
       file,
       type:file.type.startsWith('image/')?'image':'video',
       preview:URL.createObjectURL(file)
      }
    ));
    setSelectedImage((prev)=>[...prev,...filePreview]);
  }
  }

  const removeImage=(index)=>{
   const filterFile=selectedImage.filter((_,i)=>i!=index);
  setSelectedImage(filterFile)
  }

  return (
    <div className="shadow-2xl p-4 w-[40%] flex flex-col gap-2 tablet:w-full mobile:w-full mobile:shadow-none mobile:px-0 ">
      <h1 className="text-center font-semibold text-lg">Create new Gallery</h1>
      <hr />
      {/* -----------------Gallery Title--------------------- */}

      <div className=" flex flex-col gap-2">
        <p className="font-semibold">Title</p>
        <input
          className="px-4 py-1 border border-black outline-none w-full"
          type="text"
          placeholder="Add Title"
        />
      </div>

      {/* ---------------Gallery Description----------------- */}

      <div className=" flex flex-col gap-2">
        <p className="font-semibold">Description</p>
        <textarea rows={4} className="px-4 py-1 border border-black outline-none w-full" placeholder="Add Description"></textarea>
      </div>
      {/*---------------Image Upload-------------------------*/}
      <div>
      <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
               onChange={onChangeHandle}
              />
          <div className="text-center px-4 py-2 bg-blue-500 text-white rounded">Add Photos</div>
            </label>
      </div>

      {/* ----------------Uploaded images--------------------------- */}

       <div className=" flex justify-center gap-1 flex-wrap">
         {
          selectedImage.map((file,index)=>{
            return(
              <div className="w-[24%]   relative" >
                <i onClick={()=>removeImage(index)}  className="z-[1] material-icons absolute right-0 text-sm cursor-pointer font-bold bg-white">close</i>
               {
                file.type=='image'? <img className="w-full h-24 object-cover" src={file.preview} alt="" />:
                <video className="w-full h-24 object-cover" autoPlay muted src={file.preview}/>
               }
              </div>
            )
          })
         }
       </div>
      {/*---------------share Gallery  */}
      <button className="rounded-md p-2 bg-primary text-white">
        Share Gallery
      </button>
      {/* -------------------upload Post----------------------------- */}
      <div className="flex justify-end font-medium">
        <Link to={"/upload"}>Create Post</Link>
      </div>
    </div>
  );
};

export default UploadGallery;
