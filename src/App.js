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
import Profile from './Profile';
import Login from './Login';
import Books from './BestBooks';
import AddBook from './AddBook';
import BookFormModal from './BookFormModal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      email: '',
      displayModal: false
    }
  }

  displayAsModal = () => {
    this.setState ({displayModal: true});
  }

  handleClose = () => {
    this.setState ({displayModal: false});
  }


  render() {
    console.log('app', this.props);
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header
            logout={this.props.auth0.isAuthenticated}
          />
          <Switch>
            <Route exact path="/">
              {!this.props.auth0.isAuthenticated ? 
              <Login /> :
                <>
                  <MyFavoriteBooks />
                  <Books books={this.state.books} />
                  <AddBook 
                  displayAsModal={this.displayAsModal}
                  />
                  <BookFormModal 
                  show={this.state.displayModal}
                  handleClose={this.handleClose}
                  />
                </>
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
