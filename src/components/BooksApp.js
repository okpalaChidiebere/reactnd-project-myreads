import React from 'react'
import { Route } from 'react-router-dom';
import BookShelves from './BookShelves'
import SearchBook from './SearchBook'
import * as BooksAPI from '../api/BooksAPI'

class BooksApp extends React.Component {

    state = {
        books: []
    }

    componentDidMount(){

        /*In this API call, we get the result of this API with 
          the token as auth header and display the result. This helps maintains sate on page refresh
          */
        BooksAPI.getAll()
        .then((books) => {
            this.setState((currState) => ({
                ...currState,
                books
            }))
        })
    }

    updateBooks = (book) => {
        this.setState(currState => ({
            books: currState.books.filter(b => b.id !== book.id).concat(book), //we filter out the oldBook with old shelf and add the updated book with the new shelf it belongs
        }));
    }

    handleUpdateShelf = (book, shelf) => {

        // create the new book state
        const updatedBook = {
            ...book,
            shelf,
        }

        /*This API call will add the book to the necessary self as well as deleting the book from the previous self it was on IF it exists there 
        This will also help maintain the state of the app on page refresh because we make a call to this API in componentDidMount() lifecycle which
         gets called when the DOM is initialized the first time
         NOTE: we but the setState inside the update API to ensure that if our API fails, our code will not change the books displayed*/
        BooksAPI.update(book, shelf).then((shelves) => {
            if(shelves[shelf]){ //if the shelf we intend to update was returned, we know the API did not fail. we colud also do if(!shelves.error)
                this.updateBooks(updatedBook)
            }
        })
    }
    
    render(){
    
        return (
          <div >
            <Route exact path='/' render={() => (
              <BookShelves books={this.state} />
            )}/>
            <Route path='/search' render={() => (
              <SearchBook onUpdateShelf={this.handleUpdateShelf}/>
            )}/>
          </div>
        )
    }
}

export default BooksApp