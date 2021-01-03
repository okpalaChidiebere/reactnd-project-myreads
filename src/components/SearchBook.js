import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../api/BooksAPI'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'



class SearchBook extends React.Component{

    static propTypes = {
        booksInMyShelf: PropTypes.array.isRequired, //An array of books from the getAll API
        onUpdateShelf: PropTypes.func.isRequired, //function used to update the book shelf is the user want to change the shelf with select button
    }

    state = {
        query: '',  //we will bind our input field to to whatever the value of a certain property of a state is
        books: [],
        booksForBulkMove: []
    }

    handleUpdateIsBulkShelfMove = (book, isChecked) => {
        this.setState((currState) => ({
            booksForBulkMove: isChecked ? currState.booksForBulkMove.filter(b => b.id !== book.id).concat(book) : currState.booksForBulkMove.filter(b => b.id !== book.id),
        }))
    }

    HandleClearBooksForBulkMove = () => {
        //console.log("here")
        this.setState((currState) => ({
            booksForBulkMove: []
        }))
    }

    updateQuery = (query) => { //the query argument will be passed event.target.value which is the value of the input field.
        this.setState(() => ({
          query //.trim() is removed from here so that the whitespaces are not removed from the query.
        }))

        if (query !== '') {
            this.searchBooks(query)
        }
    }

    /* The input value for the search chamges, the UI re-renders because we hooked the value of the input to React state
    Now, we want to call the API when the UI re-renders so we  do that inside this event that gets called when 
    dom Re-renders
    https://reactjs.org/docs/react-component.html#the-component-lifecycle*/
    /*componentDidUpdate(prevProps){
        if(this.state.query !== ''){ //We only call the search Api when when the user inputed a query value
            this.searchBooks(this.state.query)
        }
    }*/

    searchBooks = (query) => {
        BooksAPI.search(query) //get the cbooks from the server
         .then((books) => {
            this.setState(() => ({
                books
            }))
         })
    }
    render(){

        const { onUpdateShelf, booksInMyShelf = [] } = this.props
        const { query, books, booksForBulkMove } = this.state

        const getBookShelf = (book) => {
            //if the book is undefined ? if true then we find the bookInMyShelf id that matches search book API id? if true, then we return the shelf property ?? 'none'  NOTE: we did not a the false but you can do all that as much as you want in ES6
            return booksInMyShelf?.find((item) => item.id === book.id)?.shelf??'none' 
        }

        const queryResults = query === '' 
          ? [] //if the search field is empty, we initialize an empty array so, there will be no books to show
          : !books.error && books.map(book => ( //{books: { error: "empty query", items: []} } When the search dont return aby result, you get a different format of books rather than the aarry you expect. So the .map will not work leading to you app crashing. You have to check against this situation 
            <li key={book.id}>
                <Book 
                book={ 
                    /*Bookes returned from the does not have the self property so, 
                    I add this property inside if the user actually had the book in their self */
                    {...book, shelf:getBookShelf(book)}
                } 
                onUpdateShelf={onUpdateShelf}
                onhandleUpdateIsBulkShelfMove={this.handleUpdateIsBulkShelfMove}
                />
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
                { booksForBulkMove.length > 0 && !books.error && (
                <BookShelfChanger 
                book={booksForBulkMove} 
                onClearBooksForBulkMove={this.HandleClearBooksForBulkMove} 
                onUpdateShelf={onUpdateShelf}/>
                )}
            </div>
            <div className="search-books-results">
            {/*JSON.stringify(showingBooks.map(({ id = "", imageLinks = {smallThumbnail: ""}, title = "", authors = [] } = {}) => (`${authors}`)))*/}
            {/*JSON.stringify(booksForBulkMove)*/}
              <ol className="books-grid">
                  {
                  books.error 
                  ? <h1>Search did not return any books. Please use recommended search terms!</h1> 
                  : queryResults
                  }
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBook