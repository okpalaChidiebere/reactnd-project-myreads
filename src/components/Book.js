import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

const Book = props => {

    const { onUpdateShelf, book, shelf } = props

    //The code below we used Default function paramter in ES6 JavaScript.
    const { imageLinks = {smallThumbnail: ""}, title = "", authors = [] } = book

    /*Bookes returned from the does not have the self property so, 
    I add this property inside if the user actually had the book in their self */
    const bookWithSelf = {
        ...book,
        shelf,
    }

    return(
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
                <BookShelfChanger book={bookWithSelf} onUpdateShelf={onUpdateShelf}/>
            </div>
            <div className="book-title">{title}</div>
            {authors.map((author, index) => <div key={index} className="book-authors">{author}</div>)}
        </div>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired, //book from search API without self
    onUpdateShelf: PropTypes.func.isRequired, //function used to update the book shelf is the user want to change the shelf with select button
    shelf: PropTypes.string.isRequired //shelf this book belongs to if the user has it in their shelf already. This will help reflect this in the select button
};

export default Book