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
import Books from './BestBooks';
import axios from 'axios';


class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        books: [],
        email: ''
      }
  }

  updateEmail = (userEmail) => this.setState({ email: userEmail});

  getBooks = async (e) => {
    e.preventDefault();
    console.log(this.state.email);
    try{
      const SERVER = 'http://localhost:3001';
      const books = await axios.get(`${SERVER}/books`, {params: {email: this.state.email}});

      console.log(this.email);

      this.setState({ books: books.data})
    }catch(error){
      console.error(error);
    }
  }

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
                  <>
                    <MyFavoriteBooks />
                    <Books books = {this.state.books}/>
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
