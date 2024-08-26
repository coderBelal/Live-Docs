import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {  GoogleAuthProvider, signInWithPopup,   } from 'firebase/auth';

 
 

function Login() {
    const [email, setEmail] =  useState("");
    const [password, setPassword] = useState("");
  const navigate=useNavigate()
    const handleSubmit =async(e)=>{
e.preventDefault();
try {
  await  signInWithEmailAndPassword(auth ,email,password)
  console.log("user logged in successfully")
  navigate("/")
  toast.success("User logged in Successfully", {
    position: "top-center",
  });
} catch (error) {
  console.log(error.message);

  toast.error(error.message, {
    position: "bottom-center",
  });
}
}
const handleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    navigate("/")
  } catch (error) {
    toast.error('Error signing in:', error);
  }
};

  return (
    <form
   onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg"
    >
      <h3 className="text-2xl font-semibold text-center mb-6">Login</h3>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Email address
        </label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
    
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
        >
          Submit
        </button>
      </div>
      <p className="text-sm text-center text-gray-600">
        New user?{" "}
          <Link to={"/register"} className="text-blue-500 hover:underline">
          Register Here
        </Link>
      </p>
      <div className="mt-4">
  
      </div>
      <button onClick={handleSignIn} className="bg-blue-700   ml-28 p-2  text-white rounded-lg">
          Sign In with Google
          </button>
     
    </form>
  );
}

export default Login;
