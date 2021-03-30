import React from 'react';

class Books extends React.Component{
  render(){
    return(
      this.props.books.map((books, i)=>(
        <div key= {i}>
          {books.name}
          {books.description}
          {books.status}
        </div>
      ))
      )
    }
  }
export default Books;