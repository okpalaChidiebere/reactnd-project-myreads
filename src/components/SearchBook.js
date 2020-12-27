import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../api/BooksAPI'


class SearchBook extends React.Component{

    state = {
        query: '',  //we will bind our input field to to whatever the value of a certain property of a state is
        books: [],
    }

    updateQuery = (query) => { //the query argument will be passed event.target.value which is the value of the input field.
        this.setState(() => ({
          query: query.trim()
        }))
    }

    /* The input value for the search chamges, the UI re-renders because we hooked the value of the input to React state
    Now, we want to call the API when the UI re-renders so we  do that inside this event that gets called when 
    dom Re-renders
    https://reactjs.org/docs/react-component.html#the-component-lifecycle*/
    componentDidUpdate(prevProps){
        if(this.state.query !== ''){ //We only call the search Api when when the user inputed a query value
            this.searchBooks(this.state.query)
        }
    }

    searchBooks = (query) => {
        BooksAPI.search(query) //get the cbooks from the server
         .then((books) => {
            this.setState(() => ({
                books
            }))
         })
    }

    render(){

        const { query, books } = this.state
        const queryResults = query === '' 
          ? [] //if the search field is empty, we initialize an empty array so, there will be no books to show
          : !books.error && books.map(book => ( //{books: { error: "empty query", items: []} } When the search dont return aby result, you get a different format of books rather than the aarry you expect. So the .map will not work leading to you app crashing. You have to check against this situation 
            <li key={book.id}>
                <Book book={book}/>
            </li>
        ))

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search" >CLose</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                        */}
                    <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                    />

                </div>
            </div>
            <div className="search-books-results">
            {/*JSON.stringify(showingBooks.map(({ id = "", imageLinks = {smallThumbnail: ""}, title = "", authors = [] } = {}) => (`${authors}`)))*/}
              <ol className="books-grid">
                  {queryResults}
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBook