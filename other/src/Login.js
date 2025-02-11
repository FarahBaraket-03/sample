import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
    const navigate = useNavigate();
    const [mesError,setError]=useState(null);
  // schema
  const schema = yup.object().shape({
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
    const email=data.email;
    const password=data.password
    try {
        const response = await axios.post(
          process.env.REACT_APP_API_URL+"/user/login", 
          { email , password },
          { withCredentials: true } //  Important: Enables sending/receiving cookies
        )
        Swal.fire("Login Successful!", `Welcome`, "success").then(()=>{
            navigate('/');
        });
      } catch (error) {
        setError(error.response?.data.error);
        console.error("Login error:", error.response?.data);
      }
    
  };

  return (
    <>
      <div className="form container">
        <h2 className="mb-3 text_table">Login</h2>
        <form onSubmit={handleSubmit(handleForm)} className="">
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
              <button type="submit" className=" btn btn-success py-3 px-4 bt">Submit</button>
            </div>
          </div>
          <div className="d-md-flex">
            <div className="form-group ml-md-4">
            <span className="text-secondary">you don't have an account you can <Link to='/signup'>SignUp</Link></span>
            </div>
            </div>
        </form>
        {
            mesError &&(
            <div class="alert alert-danger" role="alert">
          {mesError} 
        </div>
           )
        }
      </div>
    </>
  );
};

export default Login;
