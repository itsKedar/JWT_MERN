import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  async function register(e) {
    e.preventDefault();
    try {
      const registerData = {
        email,
        password,
        passwordVerify,
      };

      await axios.post("http://localhost:5000/auth/", registerData);
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
          <h2 className='text-center mb-4'>Sign Up</h2>
          <Form onSubmit={register}>
            <Form.Group id='email' className='mt-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                required
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}></Form.Control>
            </Form.Group>
            <Form.Group id='password' className='mt-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                required
                placeholder='Enter password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}></Form.Control>
            </Form.Group>
            <Form.Group id='passwordVerify' className='mt-3'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                required
                onChange={(e) => setPasswordVerify(e.target.value)}
                value={passwordVerify}></Form.Control>
            </Form.Group>
            <Button className='w-100 mt-4' type='submit'>
              Sign In
            </Button>
          </Form>
        </Card.Body>
        <div className='w-100 text-center mt-2'>
          Already have account?<Link to='/login'>Login</Link>
        </div>
      </Card>
    </Container>
  );
}
