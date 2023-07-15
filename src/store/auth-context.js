import React, { useState } from "react";

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
  const login = (id) => {
    setToken(id);
    localStorage.setItem("token", id);
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
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
