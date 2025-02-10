import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const Signup = () => {
    const [mesError1,setError1]=useState(null);
    const navigate = useNavigate();

  // schema
  const schema = yup.object().shape({
    fullname:yup.string().required('fullname is required').max(100).min(5),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().max(100, "Password is too long").required("Password is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Define the form submission handler
  const handleForm = async(data) => {
    console.log("Form Data:", data);
    const email=data.email;
    const password=data.password;
    const fullname=data.fullname;
    try {
        const response = await axios.post(
          process.env.REACT_APP_API_URL+"/user/add", 
          { email , password , fullname},
          { withCredentials: true } //  Important: Enables sending/receiving cookies
        );
        console.log("sign up successful:", response.data);
        Swal.fire("SignUp Successful!", `Nice`, "success").then(()=>{
            navigate('/login');
        });
      } catch (error) {
        setError1(error.response?.data.error)
        console.error("Login error:", error.response?.data);
      }
    
  };

  return (
    <>
      <div className="form container">
        <h2 className="mb-3 text_table">Sign Up</h2>
        <form onSubmit={handleSubmit(handleForm)} className="appointment-form">
        <div className="d-md-flex mb-2">
            <div className="form-group col-12">
              {/* ✅ Correct field name */}
              <input type="text" className="form-control" placeholder="fullname" {...register("fullname")} />
              <span className="text-danger">{errors.fullname?.message}</span>
            </div>
          </div>
          <div className="d-md-flex mb-2">
            <div className="form-group col-12">
              {/* ✅ Correct field name */}
              <input type="email" className="form-control" placeholder="Email" {...register("email")} />
              <span className="text-danger">{errors.email?.message}</span>
            </div>
          </div>
          <div className="d-md-flex mb-2">
            <div className="form-group col-12">
              {/* ✅ Fixed input type and field name */}
              <input type="password" className="form-control" placeholder="Password" {...register("password")} />
              <span className="text-danger">{errors.password?.message}</span>
            </div>
          </div>
          <div className="d-md-flex mb-2">
            <div className="form-group ml-md-4">
              <button type="submit" className="btn btn-success py-3 px-4 bt">Sign up</button>
            </div>
          </div>
          <div className="d-md-flex mb-2">
            <div className="form-group ml-md-4">
            <span className="text-secondary">you have a count you can <Link to='/login'>Login</Link></span>
            </div>
          </div>
        </form>
        {
            mesError1 &&(
            <div class="alert alert-danger" role="alert">
          {mesError1} 
        </div>
           )
        }
      </div>
    </>
  );
};


export default Signup