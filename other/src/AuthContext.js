import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Cookies,useCookies } from "react-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL+"/user/profile", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Not logged in");
        setUser(null);
      }
    };

    fetchUser();
  }, [cookies.jwt]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
