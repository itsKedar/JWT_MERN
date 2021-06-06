import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [LoggedIn, setLoggedIn] = useState(undefined);

  async function getLoggedIn() {
    const LoggedInRes = await axios.get("http://localhost:5000/auth/loggedIn");
    setLoggedIn(LoggedInRes.data);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);
  return (
    <AuthContext.Provider value={{ LoggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
