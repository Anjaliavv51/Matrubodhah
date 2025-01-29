// import {v2 as cloudinary} from 'cloudinary'


// const upload_on_cloudinary = async (filepath) => {
//     // Configuration
//     cloudinary.config({ 
//         cloud_name: '', 
//         api_key: '', 
//         api_secret: '' // Click 'View API Keys' above to copy your API secret
//     });
    
//     if (!filepath) {
//         console.log("file path is not upadating ")
//         return null
//     }

//     const upload_res = await cloudinary.uploader.upload(filepath)
//     return upload_res

// }

// export {upload_on_cloudinary}

// import { v2 as cloudinary } from "cloudinary";

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: "your_cloud_name",
//   api_key: "your_api_key",
//   api_secret: "your_api_secret",
//   secure: true,
// });

// const uploadToCloudinary = async (file) => {
//   try {
//     if (!file || !(file instanceof File || file instanceof Blob)) {
//       throw new Error("Invalid file. Ensure you provide a valid File or Blob object.");
//     }

//     // Read file as a base64 string
//     const base64Data = await new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result.split(",")[1]); // Exclude `data:mime;base64,`
//       reader.onerror = (err) => reject(err);
//       reader.readAsDataURL(file);
//     });

//     // Generate Data URI for Cloudinary
//     const mime = file.type;
//     const fileUri = `data:${mime};base64,${base64Data}`;

//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(fileUri, { invalidate: true });

//     // Return secure URL
//     return result.secure_url;
//   } catch (error) {
//     console.error("Error uploading to Cloudinary:", error);
//     throw error;
//   }
// };

// export { uploadToCloudinary };

// const { v2: cloudinary } = require('cloudinary');
import {v2 as cloudinary} from 'cloudinary'
import streamifier from 'streamifier'
// const streamifier = require('streamifier');
import dotenv from "dotenv"

dotenv.config()


if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
    console.error("No cloudinary configs check env file")
    process.exit()
}


// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const upload_on_cloudinary = async (fileBuffer, folderName = "demo") => {
  try {
    if (!fileBuffer) {
      console.log("No file buffer provided");
      return null;
    }

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: folderName, // Optional folder in Cloudinary
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result.secure_url); // Return the secure URL of the uploaded image
          }
        }
      );

      // Pipe the file buffer to Cloudinary's upload stream
      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  } catch (error) {
    console.error("Error during Cloudinary upload:", error);
    throw error;
  }
};

export { upload_on_cloudinary };
