import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth ,db} from "./firebase";
import {setDoc, doc} from "firebase/firestore"
import { toast } from "react-toastify";
 
 
import { useNavigate } from "react-router-dom";
 

function Register() {
    const [email, setEmail] =  useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const navigate=useNavigate()
    const handleRegister= async (e)=>{
      e.preventDefault()
      try {
       await createUserWithEmailAndPassword(auth,email,password)
       const user =auth.currentUser
       console.log(user)
       navigate("/")
       if(user){
        await setDoc(doc(db,"user",user.uid),{
          email:user.email,
          firstName:fname,
          lastName:lname
        })
       }
 
       console.log("user registered successfully")
       toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
      } catch (error) {
      toast.error(error.message)
     
      }
    }
   
  
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h3 className="text-2xl font-bold mb-6">Sign Up</h3>
  
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">First name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Last name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Email address</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
          <p className="text-center text-gray-600">
            Already registered? <a href="/login" className="text-blue-500 hover:underline">Login</a>
          </p>
      
        </form>
      </div>
    );
  }
  
  export default Register;
  