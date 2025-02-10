import  { useContext,useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { Link, useNavigate  } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";



const Profile = () => {
  const { user,setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  
  useEffect(()=>{
    if (!cookies.jwt) {
        navigate("/login");
      }
      toast(`Hi ${user.fullname} 🦄`, {
        theme: "dark",
        });
  },[cookies.jwt,navigate,cookies,user])

  const logOut=async()=>{
    try {
        await axios.post(process.env.REACT_APP_API_URL+"/user/logout", {}, { withCredentials: true });
        removeCookie("jwt");
        navigate("/login"); // Redirect to login page
      } catch (error) {
        console.error("Logout failed:", error);
      }
  }

  if (!user) return <p>Loading...</p>;

 
  return (
    <div className='container'>
      <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>
      <p className="text-secondary"> do you want to update you profile ? <Link to="/update">Here</Link></p>
      <button className="btn btn-danger" onClick={logOut}>Log out</button> 
      
      <ToastContainer 
      position="bottom-right" 
      theme="blue"
      autoClose={2000}
      closeOnClick={true}/>
      </div>
  );
};

export default Profile;
