import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: "",
  login: (id) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const isLoggedIn = !!token;

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    const currentTime = Date.now();
    if (expirationTime <= currentTime) {
      logout();
    } else {
      setTimeout(() => {
        logout();
      }, expirationTime - currentTime);
    }
  }, []);

  const login = (id) => {
    setToken(id);
    localStorage.setItem("token", id);
    const expirationTime = Date.now() + 10000;
    localStorage.setItem("expirationTime", expirationTime);
    setTimeout(() => {
      logout();
    }, 10000);
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
  };
  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
