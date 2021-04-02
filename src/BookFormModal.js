import React from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


class BookFormModal extends React.Component {
  render (){
    console.log(this.props);
    return(
      <>
      <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Dialog >
            <Modal.Header closeButton>
            </Modal.Header>

            <Modal.Body>
              <h3>Add a book</h3>
              <form onSubmit={(e) => this.props.createABook(e)}>
              <label>Book name</label>
              <input onChange={(e) => this.props.updateBooks(e.target.value)}/>
              <br/>
              <label>Description</label>
              <input onChange={(e) => this.props.updateDescription(e.target.value)}/>
              <br/>
              <label>Status</label>
              <input onChange={(e) => this.props.updateStatus(e.target.value)}/>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.handleClose}>Close</Button>
              <Button variant="primary" onClick={this.props.createABook}>Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </>
    )
  }
}

export default BookFormModal;