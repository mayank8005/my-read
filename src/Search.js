import React, { Component } from 'react'
import './App.css'

class Search extends Component{

    /* will render Search page*/
    render(){
        return (
            <div className="search-books">
            <div className="search-books-bar">
            {/* Correct on click*/}
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        );
    }
}

export default Search;