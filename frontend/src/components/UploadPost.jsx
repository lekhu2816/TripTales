import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../context/Context";
import { Link } from "react-router-dom";
import upload from "../assets/upload.jpg";
import star from "../assets/star.png";
import { Loader1 } from "./Loader";
import axios from "axios";
import { toast } from "react-toastify";

const UploadPost = () => {
  const { SERVER_URL,logout,post,setPost } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(upload);
  const inputRef = useRef();

  //---------------- uploading post fuction-------------------//

  const onHandleUploadPost = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("caption", inputRef.current.value);
    formData.append("image", selectedFile.file);
    const url = `${SERVER_URL}/api/post/create`;
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(response.data.newPost)
      if (response.status == 200) {
        setPost([response.data.newPost,...post])
        toast.success(response.data.message, {
          position: "bottom-right",
        });
      }
    } catch (error) {
      if (error.status == 400 || error.status == 500) {
        toast.error(error.response.data.message);
        
      }
      if(error.status==401){
        logout()
      }
    }
    setLoading(false);
    setSelectedFile(null);
    setPreview(upload);
    inputRef.current.value = "";
    console.log(post)
  };

  // ------------------handle file change--------------------------//

  const onChangeHandle = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.startsWith("image/")
        ? "image"
        : file.type.startsWith("video/")
        ? "video"
        : null;
      if (fileType) {
        setSelectedFile({ file, type: fileType });
        setPreview(URL.createObjectURL(file));
      } else {
        alert("Please select a valid image or video file");
      }
    }
  };
  return (
    <div className="shadow-2xl p-4 w-[40%] flex flex-col gap-2 tablet:w-full mobile:w-full mobile:shadow-none mobile:px-0 ">
      <h1 className="text-center font-semibold text-lg">Create new post</h1>

      {/* ---------------------selecting image------------------- */}

      <div className="  flex justify-center relative">
        {selectedFile ? (
          <i
            onClick={() => {
              setSelectedFile(null);
              setPreview(upload);
            }}
            className=" z-[1] bg-white p-2 font-bold cursor-pointer absolute right-0 material-icons"
          >
            close
          </i>
        ) : null}
        <label>
          <input
            type="file"
            accept="image/*,video/*"
            hidden
            onChange={onChangeHandle}
          />
          {selectedFile?.type == "video" ? (
            <video
              autoPlay
              muted
              src={preview}
              className="w-full h-[40vh] object-cover"
            />
          ) : (
            <img
              className="w-full h-[40vh]  object-cover"
              src={preview}
              alt="preview"
            />
          )}
        </label>
      </div>

      {/* --------------adding desciption about image----------------------- */}

      <div>
        <div className="flex gap-2 items-center mb-2">
          <img className="w-8" src={star} alt="star" />
          <p className="cursor-pointer text-red-500 font-semibold">
            Generate using AI
          </p>
        </div>
        <textarea
          ref={inputRef}
          className="border border-black rounded-md outline-none w-full p-2"
          placeholder="Add some text"
        ></textarea>
      </div>

      {/* -----------------------uploading posts-------------------------- */}

      {!selectedFile ? (
        <button className="rounded-md py-2 bg-orange-300 text-white">
          Share Post
        </button>
      ) : loading ? (
        <Loader1></Loader1>
      ) : (
        <button
          onClick={onHandleUploadPost}
          className="rounded-md py-2 bg-primary text-white"
        >
          Share Post
        </button>
      )}

      {/* -------------------upload gallery----------------------------- */}
      <div className="flex justify-end font-medium">
        <Link to={"/upload/gallery"}>Create Gallery</Link>
      </div>
    </div>
  );
};

export default UploadPost;
