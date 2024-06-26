import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md">
          <img
            src={currentUser.user.profilePicture}
            alt="profile"
            loading="lazy"
            className="rounded-full h-full w-full object-cover border-8 border-[lightgray] rounded-full"
          />
        </div>
          <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.user.username}/>
          <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.user.email}/>
          <TextInput type="password" id="password" placeholder="password" />
          <Button type="submit" gradientDuoTone={'purpleToBlue'}>
            Update
          </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}

export default DashProfile;
