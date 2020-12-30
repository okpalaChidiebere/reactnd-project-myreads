import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import * as changeCase from "change-case";


const BookShelf = ({shelf, books = [], onUpdateShelf}) => {
    /** This will later be filled out. This component is not connected to anything yet*/
    const listBooks = books.map( book => (
        <li key={book.id}>
            <Book book={book} shelf={shelf} onUpdateShelf={onUpdateShelf}/>
        </li> 
    ))

    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{changeCase.capitalCase(shelf)}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {listBooks}
                </ol>
            </div>
        </div>
    )
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired, //book from search API without self
    onUpdateShelf: PropTypes.func.isRequired, //function used to update the book shelf is the user want to change the shelf with select button
    shelf: PropTypes.string.isRequired //shelf this book belongs to if the user has it in their shelf already. This will help reflect this in the select button
}

export default BookShelf