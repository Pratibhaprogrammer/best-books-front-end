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
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      email: '',
      displayModal: false,
      booksName: '',
      description: '',
      status: ''
    }
  }

  updateBooks = (booksName) => this.setState({ booksName });
  updateDescription = (description) => this.setState({ description });
  updateStatus = (status) => this.setState({ status });

  displayAsModal = () => {
    this.setState ({displayModal: true});
  }

  handleClose = () => {
    this.setState ({displayModal: false});
  }

  deleteItem = async (index) => {
    const SERVER = 'http://localhost:3001';
    const books = await axios.delete(`${SERVER}/books/${index}`, {params: {email: this.state.auth0.user.email}});
    const newBookArray = this.state.books.filter((book, i)=>{
      return index !== i;
    });
    this.setState({ books: newBookArray });
  }

  createABook = async (e) => {
    e.preventDefault();
    console.log(this.props.auth0.user);
    const SERVER = 'http://localhost:3001';
    const books = await axios.post(`${SERVER}/books`, { booksName: this.state.booksName, description: this.state.description, status: this.state.status, email: this.props.auth0.user.email }); //took out user and email
    this.setState({ books: books.data });
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
                  createABook={this.createABook}
                  updateBooks={this.updateBooks}
                  show={this.state.displayModal}
                  handleClose={this.handleClose}
                  updateDescription={this.updateDescription}
                  updateStatus={this.updateStatus}
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
