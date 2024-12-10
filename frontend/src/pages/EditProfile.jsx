import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import coverPic from "../assets/coverPic.jpeg";
import profile from "../assets/profile.jpg";
const EditProfile = () => {
  const { setShowDropdown } = useContext(AppContext);
  const [highlight, setHighlight] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(coverPic);
  const [uploadCoverPhoto, setUploadCoverPhoto]=useState(null);
  const [profilePhoto, setProfilePhoto] = useState(profile);
  const [uploadProfilePhoto, setUploadProfilePhoto]=useState(null);

  useEffect(() => {
    setShowDropdown(false);
  }, []);

  const onChangeCoverPhoto = (e) => {
   const file=e.target.files[0];
   setUploadCoverPhoto(file);
   if (file && file.type.startsWith('image/')) {
    setCoverPhoto(URL.createObjectURL(file))
  } else {
    alert('Please select a valid image file');
  }
  };

  const onChangeProfilePhoto = (e) => {
    const file=e.target.files[0];
    setUploadProfilePhoto(file);
    if (file && file.type.startsWith('image/')) {
     setProfilePhoto(URL.createObjectURL(file))
   } else {
     alert('Please select a valid image file');
   }
  };

  const onChangeHandle = () => {
    setHighlight(true);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div onClick={() => setShowDropdown(false)} className="flex justify-center mobile:mb-14 tablet:mb-14">
      <div className="shadow-2xl w-[60%] flex flex-col mobile:w-full mobile:shadow-none tablet:w-full">
        <h1 className="p-2 text-2xl border-b border-slate-200 font-bold text-center">
          Edit Profile
        </h1>

        {/* --------------------Edit cover photo------------------------ */}

        <div className="p-2  flex flex-col gap-2 border-b border-slate-200">
          <h1 className="text-xl font-semibold">Cover photo</h1>
          <div className="flex justify-center">
            <div className="w-[80%]  mobile:w-full">
              <img className="rounded-xl" src={coverPhoto} alt="" />
              <div className="flex justify-between mt-2">
                <label className="cursor-pointer">
                  <input 
                  onChange={onChangeCoverPhoto}
                  type="file" 
                  accept="image/*"
                   className="hidden" 
                   />
                  <div className="rounded-lg text-white text-sm px-4 py-2 bg-primary">
                    Add Photo
                  </div>
                </label>
                {uploadCoverPhoto ? (
                  <button className="rounded-lg text-sm px-4 py-2 bg-gray-300">
                    Update
                  </button>
                ) : (
                  <button className="rounded-lg text-sm px-4 py-2 bg-gray-100 text-gray-400">
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/*-----------------------profile photo--------------------------- */}

        <div className="p-2  flex flex-col gap-2 border-b border-slate-200">
          <h1 className="text-xl font-semibold">Profile photo</h1>
          <div className="flex justify-center">
            <div className="w-[80%] flex justify-between items-center  mobile:w-full">
              <label>
              <input 
                  onChange={onChangeProfilePhoto}
                  type="file" 
                  accept="image/*"
                   className="hidden" 
                   />
                   <div className="relative">
                <img className="w-24 h-24 rounded-full" src={profilePhoto} alt="" />
                <div className="absolute -bottom-1   right-1 flex justify-center items-center p-1 bg-slate-200 rounded-full  ">
                <i className="text-md material-icons rounded-full">edit</i>
                </div>
                
              </div>
              </label>
              
              {uploadProfilePhoto ? (
                  <button className="rounded-lg text-sm px-4 py-2 bg-gray-300">
                    Update
                  </button>
                ) : (
                  <button className="rounded-lg text-sm px-4 py-2 bg-gray-100 text-gray-400">
                    Update
                  </button>
                )}
            </div>
          </div>
        </div>

        {/* ----------------Update nickname------------------------- */}

        <form
          onSubmit={handleFormSubmit}
          className="p-2  flex flex-col gap-2 border-b border-slate-200"
        >
          <h1 className="text-xl font-semibold">User details</h1>
          <div className="flex justify-center">
            <div className="w-[80%] flex flex-col gap-2  mobile:w-full">
              <div className="">
                <p className="text-sm font-medium mb-1">Username</p>
                <input
                  className=" border-[1px] border-black px-2 py-1 rounded-sm"
                  type="text"
                  placeholder="Username"
                  onChange={onChangeHandle}
                />
              </div>
              <div className="w-[80%]">
                <p className="text-sm font-medium mb-1">Bio</p>
                <textarea
                  onChange={onChangeHandle}
                  className="border-[1px] border-black rounded-sm w-full p-2"
                ></textarea>
              </div>
              <div className="flex justify-end">
                {highlight ? (
                  <button className="rounded-lg text-sm px-4 py-2 bg-gray-300">
                    Update
                  </button>
                ) : (
                  <button className="rounded-lg text-sm px-4 py-2 bg-gray-100 text-gray-400">
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
