import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

class UpdateForm extends React.Component {


  render() {
    console.log(this.props.chosenBooks)
    return (
      
      <form onSubmit={(e) => this.props.replaceABook(e)}>
         <label>Description</label>
        <input onChange={(e) => this.props.updateDescription(e.target.value)} placeholder={this.props.chosenBooks}></input>
        <Button type="submit">Update Item</Button>
      </form>
      
    )
  }
}

export default UpdateForm;
