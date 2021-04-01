import React from 'react';

class AddBook extends React.Component {


  // popOut = () => {
  //   this.props.displayAsModal(this.props.index);

  render () {
    return(
      <>
        {/* <form className="form" onClick={this.state.displayAsModal}>
          <button type = "submit"> Add Book</button>
        </form> */}

        <button 
          // onClick={popOut}
          // show={this.state.displayModal}
          // handleClose={this.handleClose}
        >Add Book</button>
      </>
    )
  }
}

export default AddBook;