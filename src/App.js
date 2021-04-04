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
      status: '',
      index: null,
      chosenBooks: {},
      indexOfChosenBooks: -1,
      displayUpdateForm: false
    }
  }

  updateBooks = (booksName) => this.setState({ booksName });
  updateDescription = (description) => this.setState({ description });
  updateStatus = (status) => this.setState({ status });

  handleUpdateBooks = (books) => this.setState({ books })

  displayAsModal = () => {
    this.setState({ displayModal: true });
  }

  handleClose = () => {
    this.setState({ displayModal: false });
  }

  deleteItem = async (index) => {
    const SERVER = 'http://localhost:3001';
    const deleteBook = await axios.delete(`${SERVER}/books/${index}`, { params: { email: this.props.auth0.user.email } });
    console.log('inside deleteItem', deleteBook);
    const newBookArray = this.state.books.filter((book, i) => {
      return index !== i;
    });
    this.setState({ books: newBookArray });
  }

  createABook = async (e) => {
    e.preventDefault();
    console.log(this.props.auth0.user.email);
    const SERVER = 'http://localhost:3001';
    const books = await axios.post(`${SERVER}/books`, { booksName: this.state.booksName, description: this.state.description, status: this.state.status, email: this.props.auth0.user.email }); //took out user and email
    this.setState({ books: books.data });
    console.log('look here', books.data);
  }

  displayUpdateForm = (index) => {
    const chosenBooks = this.state.books[index];
    this.setState({ chosenBooks, indexOfChosenBooks: index });

    this.setState({ displayUpdateForm: true });
  }

  replaceABook = async (e) => {
    e.preventDefault()
    const SERVER = 'http://localhost:3001';
    const book = { description: this.state.description }
    this.state.books.splice(this.state.indexOfChosenBooks, 1, book);

    const updatedBookArray = await axios.put(`${SERVER}/books/${this.state.indexOfChosenBooks}`, { email: this.state.email, description: this.state.description });

    this.setState({ books: updatedBookArray.data });
  }


  render() {
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
                  <Books books={this.state.books}
                    handleUpdateBooks={this.handleUpdateBooks}
                    deleteItem={this.deleteItem}
                  />
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
                  {/* <UpdateForm
                    chosenBooks={this.state.chosenBooks}
                    updateBooks={this.updateBooks}
                    replaceABook={this.replaceABook}
                  /> */}
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
