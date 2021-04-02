import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      email: '',
    }
  }
  
  componentDidMount = () => {
    this.getBooks();
  }

  getBooks = async () => {
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
  }
  render() {
    console.log(this.state)
    return (
      <>
        <h2>Favorite Books</h2>
        {this.state.books.length > 0 &&
          <Carousel style={{ minHeight: "8rem" }}>
            {this.state.books.map((books, i) => (
              <Carousel.Item key={i}>
                <img
                  className="d-block w-100"
                  //src="holder.js/800x400?text=First slide&bg=373940"
                  src="https://placekitten.com/800/400"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>{books.name}</h3>
                  <p>{`description: ${books.description}`}
                    <br />
                    {`status: ${books.status}`}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        }
      </>
    )
  }
}


export default withAuth0(Books);