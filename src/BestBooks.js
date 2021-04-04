import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import UpdateForm from './UpdateForm';

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // books: [],
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
      console.log(this.state.email);

      this.props.handleUpdateBooks(books.data)
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    console.log(this.state)
    return (
      <>
        <h2>Favorite Books</h2>
        {this.props.books.length > 0 &&
          <Carousel style={{ minHeight: "8rem" }}>
            {this.props.books.map((books, i) => (
              <Carousel.Item key={i}>
                <img
                  className="d-block w-100"
                  src="https://placekitten.com/800/400"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>{books.name}</h3>
                  <p>{`description: ${books.description}`}
                  <br />
                  {`status: ${books.status}`}</p>

                  <Button onClick={() => this.props.deleteItem(i)}>
                    Delete
                  </Button>
                  <UpdateForm
                    index={this.props.index}
                    chosenBooks={this.props.chosenBooks}
                    updateBooks={this.props.updateBooks}
                    replaceABook={this.props.replaceABook}
                    displayUpdateForm={this.props.displayUpdateForm}
                  />
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