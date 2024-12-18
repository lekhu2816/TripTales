import { v2 as cloudinary } from "cloudinary";

// -----------------upload multiple file to the cloudinary----------//

const uploadToCloudnaryMultiple = async (files) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDNIARY_CLOUD_NAME,
    api_key: process.env.CLOUDNIARY_API_KEY,
    api_secret: process.env.CLOUDNIARY_API_SECRET,
  });
  const result = [];
  try {
    for (let index in files) {
      const resourceType = files[index].mimetype.startsWith("image")
        ? "image"
        : "video";
      const response = await cloudinary.uploader.upload(files[index].path, {
        resource_type: resourceType,
      });
      let obj = {
        fileType: resourceType,
        url: response.secure_url,
      };
      result.push(obj);
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};

// ------------------upload single file to the cloudniary-------------//

const uploadToCloudnarySingle = async (file,width,height) => {
    
  cloudinary.config({
    cloud_name: process.env.CLOUDNIARY_CLOUD_NAME,
    api_key: process.env.CLOUDNIARY_API_KEY,
    api_secret: process.env.CLOUDNIARY_API_SECRET,
  });
  const resourceType = file.mimetype.startsWith("image") ? "image" : "video";
  try {
    const response = await cloudinary.uploader.upload(file.path, {
      resource_type: resourceType,
      transformation:{
        width:width,
        height:height,
        crop:"fill",
        gravity:"center"
      }
      
    });

    return {
      fileType: resourceType,
      url: response.secure_url,
    };
  } catch (error) {
    console.log("Error occured");
  }
};

export { uploadToCloudnaryMultiple, uploadToCloudnarySingle };
