// import React, { useState } from "react";
// import "./SignUp.css";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     employeeId: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//     role: "gateworker" // Default role
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { employeeId, username, password, confirmPassword, role } = formData;

//     // Basic Validation
//     if (!employeeId || !username || !password || !confirmPassword || !role) {
//       setError("Please fill out all fields.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:3000/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ employeeId, username, password, role })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Sign-up successful!");
//         setFormData({
//           employeeId: "",
//           username: "",
//           password: "",
//           confirmPassword: "",
//           role: "gateworker"
//         });
//         setError("");
//       } else {
//         setError(data.error || "Sign-up failed. Please try again.");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again later.");
//     }
//   };

//   return (
//     <div className="signup-container">
//       {/* Left Section */}
//       <div className="signup-left">
//         <h1 className="signup-title">Parkivia</h1>
//         <p className="signup-subtitle">Parking made simple</p>
//       </div>

//       {/* Right Section */}
//       <div
//         className="signup-right"
//         style={{
//           backgroundImage:
//             "url('https://source.unsplash.com/800x600/?parking,admin')"
//         }}
//       >
//         <div className="signup-form-container">
//           <h2 className="signup-header">SIGN UP</h2>
//           {error && <p className="signup-error">{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="signup-form-group">
//               <label htmlFor="employeeId" className="signup-label">
//                 Employee ID
//               </label>
//               <input
//                 type="text"
//                 id="employeeId"
//                 className="signup-input"
//                 placeholder="Enter employee ID"
//                 value={formData.employeeId}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="signup-form-group">
//               <label htmlFor="username" className="signup-label">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 className="signup-input"
//                 placeholder="Enter username"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="signup-form-group">
//               <label htmlFor="password" className="signup-label">
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="signup-input"
//                 placeholder="Enter password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="signup-form-group">
//               <label htmlFor="confirmPassword" className="signup-label">
//                 Re-enter Password
//               </label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 className="signup-input"
//                 placeholder="Re-enter password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="signup-form-group">
//               <label htmlFor="role" className="signup-label">
//                 Role
//               </label>
//               <select
//                 id="role"
//                 className="signup-input"
//                 value={formData.role}
//                 onChange={handleChange}
//               >
//                 <option value="gateworker">Gate Worker</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>
//             <button type="submit" className="signup-button">
//               Sign Up
//             </button>
//           </form>
//           <p className="signup-prompt">
//             Already have an account?
//             <a href="/login" className="signup-link">
//               Log In
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "gateworker" // Default role
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a success message exists from previous redirection
    const successMessage = localStorage.getItem("signupSuccess");
    if (successMessage) {
      toast.success(successMessage, { autoClose: 2000 });
      localStorage.removeItem("signupSuccess"); // Remove it after displaying
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { employeeId, username, password, confirmPassword, role } = formData;

    // Basic Validation
    if (!employeeId || !username || !password || !confirmPassword || !role) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ employeeId, username, password, role })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("signupSuccess", "Sign-up successful! Please log in.");
        navigate("/admin/home"); 
      } else {
        setError(data.error || "Sign-up failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Left Section */}
      <div className="signup-left">
        <h1 className="signup-title">Parkivia</h1>
        <p className="signup-subtitle">Parking made simple</p>
      </div>

      {/* Right Section */}
      <div
        className="signup-right"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/800x600/?parking,admin')"
        }}
      >
        <div className="signup-form-container">
          <h2 className="signup-header">SIGN UP</h2>
          {error && <p className="signup-error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="signup-form-group">
              <label htmlFor="employeeId" className="signup-label">
                Employee ID
              </label>
              <input
                type="text"
                id="employeeId"
                className="signup-input"
                placeholder="Enter employee ID"
                value={formData.employeeId}
                onChange={handleChange}
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="username" className="signup-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="signup-input"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="password" className="signup-label">
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="signup-input"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="confirmPassword" className="signup-label">
                Re-enter Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="signup-input"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="role" className="signup-label">
                Role
              </label>
              <select
                id="role"
                className="signup-input"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="gateworker">Gate Worker</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
