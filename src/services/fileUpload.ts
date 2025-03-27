
import { AppError } from "../utils/error.middleware";
import cloudinary from "../config/cloudinary.config";
import { StatusCode } from "../utils/statusCode";

export const uploadPhoto = async (file: any): Promise<string> => {
  if (!file) {
    throw new AppError("No image provided", StatusCode.NO_CONTENT);
  }

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader.upload(file.path, (error: any, result: { secure_url: string }) => {
      if (error) {
        console.log("Cloudinary upload error", error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

  return result.secure_url;
};