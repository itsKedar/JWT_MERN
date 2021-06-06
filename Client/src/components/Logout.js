import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from "../context/AuthContext";
import { Nav } from "react-bootstrap";
export default function Logout() {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  async function logoutBtn() {
    await axios.get("http://localhost:5000/auth/logout");
    await getLoggedIn();
    history.push("/");
  }
  return <Nav.Link onClick={logoutBtn}>Logout</Nav.Link>;
}
