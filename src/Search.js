import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import * as BookAPI from './BooksAPI'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class Search extends Component{

    //defining proptypes of this class
    static propTypes={
        books: PropTypes.array.isRequired,      //array of books
        changeShelf: PropTypes.func.isRequired  //method to change shelf
    }

    state={
        books:[]
    }

    //will trigger whenever input feild changes
    onInputChange= (input)=>{
        //storing coy of old books available
        const oldBooks = this.props.books;
        //triming input 
        input=input.trim();
        //checking for blank input
        if(!input)
            return;
        //requesting search result
        BookAPI.search(input).then(
            (resultBooks)=>{
                //checking for error in response
                if(resultBooks.error)
                    return;
                resultBooks = resultBooks.map((resultBook)=>{
                    const bookExist = oldBooks.find((oldbook)=>oldbook.id === resultBook.id);
                    if(bookExist){
                        resultBook.shelf = bookExist.shelf;
                    }else{
                        resultBook.shelf='none';
                    }
                    return resultBook;
                })
                // updating state of component
                this.setState({books:resultBooks});
            }
        );
    }

    /* will render Search page*/
    render(){
        return (
            <div className="search-books">
            <div className="search-books-bar">
            {/* Correct on click*/}
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input 
                    type="text" 
                    placeholder="Search by title or author"
                    onChange={event=>this.onInputChange(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
                <BookShelf books={this.state.books} shelfName='Search Result' changeShelf={this.props.changeShelf}/>      
            </div>
          </div>
        );
    }
}

export default Search;