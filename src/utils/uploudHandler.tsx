import axios from "axios";

const uploadHandler = async (file: File, folderName: string) => {
  const apiUrl = "https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/upload";

  let formData = new FormData();
  formData.append("file", file);
  formData.append("folderName", folderName); // Add folderName to the formData

  try {
    const res = await axios.post(apiUrl, formData);
    
    if (res.status === 200) {
      const data = res.data;
      return { success: true, ...data };
    } else {
      return { success: false, message: "Upload failed" };
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, message: "Upload failed" };
  }
};

export default uploadHandler;