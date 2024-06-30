import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            id="title"
            className="flex-1"
          />
          <Select>
            <option value={"uncatergorized"}>Uncatergorized</option>
            <option value={"javascript"}>Javascript</option>
            <option value={"react"}>React.js</option>
            <option value={"node"}>Node.js</option>
          </Select>
        </div>
        <div className="flex items-center border-4 border-teal-500 border-dotted p-3 gap-4">
          <FileInput accept="image/*" id="image" type="file" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            outline
            size={"sm"}
          >
            upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something amazing..." className="h-72 mb-12" required/>
        <Button type="submit" gradientDuoTone="purpleToPink">Publish</Button>
      </form>
    </div>
  );
}

export default CreatePost;
