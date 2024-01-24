import cloudinary from 'cloudinary';

export async function uploadImage(buffer) {
  const uploadResult = await new Promise((resolve) => {
    cloudinary.v2.uploader
      .upload_stream({ folder: 'doctor_appointments' }, (error, result) => {
        if (error) {
          console.log(error);
        }
        return resolve(result);
      })
      .end(buffer);
  });
  //   console.log('uploadImage uploadResult:', uploadResult);
  return uploadResult;
}

export async function deleteImage(imageId) {
  //   console.log('deleteImage imageId:', imageId);
  try {
    const result = await cloudinary.v2.uploader.destroy(imageId);
    // console.log('deleteImage result:', result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
