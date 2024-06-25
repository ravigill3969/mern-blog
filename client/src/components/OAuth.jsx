import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firbase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()


  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const results = await signInWithPopup(auth, provider);
      console.log(results);
      const res = await axios.post("http://localhost:3000/api/auth/google", {
        name: results.user.displayName,
        email: results.user.email,
        googlePhotoUrl: results.user.photoURL,
      });
      
      const data = res.data
      if(data.success === true){
        dispatch(signInSuccess(data))
        navigate('/')
      }else{
        dispatch(signInFailure(data))
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      gradientDuoTone={"pinkToOrange"}
      outline
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}

export default OAuth;
