import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import LoginButton from './LoginButton';

class Login extends React.Component {
  render() {
    return(
      <>
        <center>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Log In</Card.Title>
              <LoginButton/>
            </Card.Body>
          </Card>
        </center>
      </>
    )
  }
}

export default Login;
