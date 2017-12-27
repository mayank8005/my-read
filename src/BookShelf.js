import React, { Component } from 'react'
import './App.css'


/* BookShelf is a class which contain all books
it acts like container to all the books*/
class BookShelf extends Component{

    // render BookShelfs
    render(){
        return (
        <div className='bookshelf'>
            {/*TODO: bookshelf title */ }
            <h2 className='bookshelf-title'>{this.props.shelfName}</h2>
            <div className='bookshelf-books'>
                {/* book starts */ }
                <ol className="books-grid">
                    {this.props.books.map((book)=>(
                        <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div 
                                className="book-cover" 
                                style={{ width: 128, height: 193, 
                                backgroundImage: `url("${(book.imageLinks)?book.imageLinks.thumbnail:''}")` }}>
                            </div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} 
                                onChange={(event)=>this.props.changeShelf(book, event.target.value)}>
                                <option value="NULL" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.author}</div>
                        </div>
                      </li>
                    ))}
                </ol>
            </div>
        </div>
            
        )}
}

export default BookShelf