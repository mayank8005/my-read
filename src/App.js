import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'
import Header from './Header'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  changeShelf = (bookID, newShelf)=>{
    this.setState((state)=>{
      return {
        books: state.books.map((book)=>{
          if(book.id===bookID){
            book.shelf = newShelf;
            BooksAPI.update({id:book.id}, newShelf);
            return book;
          }
          return book;
        })
      }
    })
  }

  componentDidMount(){
    BooksAPI.getAll().then(books=>(
      this.setState({books})
    ))
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search/>
        ) : (
          <div className="list-books">
            <Header/>
            <div className="list-books-content">
                <BookShelf books={this.state.books.filter(book=>book.shelf==='currentlyReading')} shelfName='Currently Reading' changeShelf={this.changeShelf}/>
                <BookShelf books={this.state.books.filter(book=>book.shelf==='wantToRead')} shelfName='Want To Read' changeShelf={this.changeShelf}/>
                <BookShelf books={this.state.books.filter(book=>book.shelf==='read')} shelfName='Read'changeShelf={this.changeShelf}/>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
