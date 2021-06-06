import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  async function login(e) {
    e.preventDefault();
    try {
      const registerData = {
        email,
        password,
      };

      await axios.post("http://localhost:5000/auth/login", registerData);
      await getLoggedIn();
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: "90vh" }}>
      <Card style={{ width: "25rem" }}>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          <Form onSubmit={login}>
            <Form.Group id='email' className='mt-4'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}></Form.Control>
            </Form.Group>
            <Form.Group id='password' className='mt-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}></Form.Control>
            </Form.Group>
            <Button className='w-100 mt-4' type='submit'>
              Log In
            </Button>
          </Form>
        </Card.Body>
        <div className='w-100 text-center mt-2'>
          Don't have account?<Link to='/register'>Register</Link>
        </div>
      </Card>
    </Container>
  );
}
