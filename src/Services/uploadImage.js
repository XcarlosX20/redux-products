import axios from "axios";
export const uploadImage = async(image) => {
    const upload_preset = "snkfpkhq"
    const API_UPLOAD = "https://api.cloudinary.com/v1_1/do5yybhwe/image/upload";
    const formData = new FormData;
    formData.append('file', image);
    formData.append('upload_preset', upload_preset);
    const response = await axios.post(API_UPLOAD, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data.secure_url;
}