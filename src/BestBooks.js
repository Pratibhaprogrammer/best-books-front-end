import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class Books extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
      email:''
    }
  }
  componentDidMount = async () => {
    try {
      console.log('email', this.props.auth0.user.email);
      const SERVER = 'http://localhost:3001';
      const books = await axios.get(`${SERVER}/books`, { params: { email: this.props.auth0.user.email } });
      console.log(books.data);
      console.log(this.email);
  
      this.setState({ books: books.data })
    } catch (error) {
      console.error(error);
    }
    // updateEmail = (userEmail) => this.setState({ email: userEmail });
  }
  render() {
    return (
      <>
      <h2>here are your books</h2>
        {this.props.books.map((books, i) => (
          <div key={i}>
            {books.name}
            {books.description}
            {books.status}
          </div>
        ))}
      </>
      )
    }
}
export default withAuth0(Books);