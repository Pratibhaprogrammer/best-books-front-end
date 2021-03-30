import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import Login from './Login';
import LogoutButton from './LogoutButton';

class Header extends React.Component {
  render() {
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
            <Login />
              {this.props.auth0.isAuthenticated &&
              <LogoutButton />
              }
      </Navbar>
    )
  }
}

export default Header;
