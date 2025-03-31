import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Auth.Provider";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const dataLogin = {
      email: email, // Correggi qui
      password: password, // E qui
    };
    const response = await login(dataLogin);
    if (response) {
      console.log("Login Successful");
      navigate("/dashboard");
    } else {
      alert("Credenziali non valide");
    }
    // Add login logic here
    console.log("Login attempted", { email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Blurred Background Image */}
      <div className="w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#6a11cb] to-[#2575fc]"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-[var(--secondary-color)] mb-6 text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--accent-color)] text-white py-2 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
