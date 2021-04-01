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
              <form onSubmit={(e) => this.props.createABook(e)}>
              <label>Add a Book</label>
              <input onChange={(e) => this.props.updateBook(e.target.value)}/>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary">Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </>
    )
  }
}

export default BookFormModal;