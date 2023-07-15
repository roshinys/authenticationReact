import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: "",
  login: (id) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const isLoggedIn = !!token;
  const login = (id) => {
    setToken(id);
  };
  const logout = () => {
    setToken(null);
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
