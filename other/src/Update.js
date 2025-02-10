import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link } from "react-router-dom";

const Update = () => {
  const { user, setUser } = useContext(AuthContext);

  // Schema validation
  const schema = yup.object().shape({
    fullname: yup.string().required("Fullname is required").max(100).min(5),
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { fullname: user?.fullname || "", email: user?.email || "" },
  });

  const handleForm = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await axios.put(
        process.env.REACT_APP_API_URL+"/user/update",
        { email: data.email, fullname: data.fullname },
        { withCredentials: true }
      );
      setUser(response.data);
      Swal.fire("Update Successful!", "Your profile has been updated.", "success");
    } catch (error) {
      console.error("Update error:", error.response?.data);
    }
  };

  return (
    <div className="container mt-4 text-center">
      <h3 className="text-success">Update Profile</h3>
      <form onSubmit={handleSubmit(handleForm)} className="appointment-form">
        <div className="d-md-flex mb-2">
          <div className="form-group col-12">
            <input
              type="text"
              className="form-control"
              defaultValue={user?.fullname || ""}
              placeholder="Full Name"
              {...register("fullname")}
            />
            <span className="text-danger">{errors.fullname?.message}</span>
          </div>
        </div>
        <div className="d-md-flex mb-2">
          <div className="form-group col-12">
            <input
              type="email"
              className="form-control"
              defaultValue={user?.email || ""}
              placeholder="Email"
              {...register("email")}
            />
            <span className="text-danger">{errors.email?.message}</span>
          </div>
        </div>
        <div className="d-md-flex mb-2">
          <div className="form-group ml-md-4">
            <button type="submit" className="btn btn-success py-3 px-4">
              Update
            </button>
          </div>
        </div>
      </form>
      <p className="text-outline-success">Go Back <Link to='/profile'>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg>
      </Link></p>
    </div>
  );
};

export default Update;
