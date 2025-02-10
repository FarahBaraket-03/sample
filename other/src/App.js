import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import  { useEffect } from "react";
import './App.css';



function App() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    useEffect(()=>{
      console.log(cookies)
      if (!cookies.jwt) {
          navigate("/login");}
    },[cookies.jwt,cookies,navigate])


  return (
    <div className="App">
      <h1>HELLOO THIS IS HOME PAGE</h1>
      <h3>Click to see yor profile <Link to='/profile'> Here </Link> </h3>
    </div>
  );
}

export default App;
