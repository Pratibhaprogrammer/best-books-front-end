import React from 'react';

class AddBook extends React.Component {



  render () {
    return(
      <>
        {/* <form className="form" onClick={this.state.displayAsModal}>
          <button type = "submit"> Add Book</button>
        </form> */}

        <button 
          onClick={() => this.props.displayAsModal()}
        >Add Book</button>
      </>
    )
  }
}

export default AddBook;