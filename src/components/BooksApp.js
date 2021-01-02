import React from 'react'
import { Route } from 'react-router-dom';
import BookShelves from './BookShelves'
import SearchBook from './SearchBook'
import * as BooksAPI from '../api/BooksAPI'

class BooksApp extends React.Component {

    constructor(props){

        super(props)

        //thie API to update shelf looks like {currentlyReading: [...bookdIds], wantToread: [...bookdIds], read: [...bookdIds]}
        this.shelves = ["currentlyReading", "wantToRead", "read"] 

        this.state = {
            books: []
        }
    }

    componentDidMount(){

        /*In this API call, we get the result of this API with 
          the token as auth header and display the result. This helps maintains sate on page refresh
          */
        this.refreshBooksInMyShelf()
    }

    refreshBooksInMyShelf = async () => {

        try{
            const books = await BooksAPI.getAll()
            this.setState((currState) => ({
                ...currState,
                books
            }))
        }catch(e){
            alert(`Failed to fetch books: ${e.message}`)
        }
    }

    updateBooks = (book, shelf) => {
        this.setState(currState => ({
            books: shelf !== 'none' ? currState.books.filter(b => b.id !== book.id).concat(book) : currState.books.filter(b => b.id !== book.id), //we filter out the oldBook with old shelf and add the updated book with the new shelf it belongs or we filter out the book when the shelf is none
        }));
    }

    handleUpdateShelf = async (books, shelf) => {

        const updatedBooks = books.length > 0 ? books.map(book => ({ ...book, shelf })) : [{ ...books, shelf }]

        //console.log(updatedBooks)

        //More on for loops and try-catch blocks in asynchronous function here
        //https://jonathangrosdubois.medium.com/the-myth-of-evil-for-loops-and-try-catch-blocks-in-javascript-8601860295c1
        try{
            for(const index in updatedBooks){
                //This API call will add the book to the necessary self as well as deleting the book from the previous self it was on IF it exists there 
                await BooksAPI.update(updatedBooks[index], shelf)
                //We set the state of the books list after the API call to ensure that if our API fails, our code will not change the books displayed *
                this.updateBooks(updatedBooks[index], shelf)
            }
        }catch{
            //we catch the error thrown if the API fails
            alert('Oops! Error updating Book Shelf')
        }
    }
    
    render(){

        const { books } = this.state
        const { shelves } = this
        return (
          <div >
            <Route exact path='/' render={() => (
              <BookShelves books={books} shelfCategories = {shelves} onUpdateShelf={this.handleUpdateShelf}/>
            )}/>
            <Route path='/search' render={() => (
              <SearchBook onUpdateShelf={this.handleUpdateShelf} booksInMyShelf={books}/>
            )}/>
          </div>
        )
    }
}

export default BooksApp