import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firbase";
import axios from "axios";

function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "uncatergorized",
    content: "",
    image: "",
  });

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image to upload");
        return;
      }
      setImageUploadError(null);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        () => {
          setImageUploadError("Something went wrong while uploading the image");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(0);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Something went wrong while uploading the image");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("api/post/create-post", formData, {
      withCredentials: true,
    });
    console.log(res);
    setFormData({
      title: "",
      category: "uncatergorized",
      content: "",
      image: "",
    });
  };
  console.log(formData)
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            id="title"
            className="flex-1"
            onChange={handleChange}
            value={formData.title}
          />
          <Select onChange={handleChange} value={formData.category} id="select">
            <option value={"uncatergorized"}>Uncatergorized</option>
            <option value={"javascript"}>Javascript</option>
            <option value={"react"}>React.js</option>
            <option value={"node"}>Node.js</option>
          </Select>
        </div>
        <div className="flex items-center border-4 border-teal-500 border-dotted p-3 gap-4">
          <FileInput
            accept="image/*"
            id="image"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            outline
            size={"sm"}
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            upload Image
          </Button>
        </div>
        {imageUploadError && (
          <p className="text-red-500 text-sm">{imageUploadError}</p>
        )}
        {formData.image && (
          <img src={formData.image} alt="uploaded" className="w-full h-12 object-cover" />
        )}
        <ReactQuill
          onChange={handleQuillChange}
          id="content"
          theme="snow"
          placeholder="Write something amazing..."
          className="h-72 mb-12"
          required
          value={formData.content}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
}

export default CreatePost;
