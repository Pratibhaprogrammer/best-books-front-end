import React from 'react';
import Header from './Header';
// import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import MyFavoriteBooks from './MyFavoriteBooks';
import Profile from'./Profile';
import Login from './Login';

class App extends React.Component {

  render() {
    console.log('app', this.props)
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
            <Header 
            logout={this.props.auth0.isAuthenticated}
            />
            <Switch>
              <Route exact path="/">
                <Login />
                {this.props.auth0.isAuthenticated &&
                  <MyFavoriteBooks />
                }
              </Route>
              <Route exact path="/Profile">
                {this.props.auth0.isAuthenticated &&
                  <Profile />
                }
              </Route>
            </Switch>
            <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
