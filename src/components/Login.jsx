import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      localStorage.setItem("jwt", data.token);
      toast.success(data.message || "User Login Successfully :)");
      navigateTo("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error, ": Error in login.jsx");
      toast.error("Failed to Login User :(");
    }
  };
  return (
    <div className="flex bg-gray-100 h-screen w-screen justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-lg">
        <h2 className="mb-5 text-2xl font-semibold text-center ">Login Page</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Password" className="block mb-2 font-semibold">
              Password
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full mt-5 bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3"
            type="submit"
          >
            Login
          </button>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
