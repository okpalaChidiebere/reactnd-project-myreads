import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

const Book = props => {

    const { onUpdateShelf, book } = props

    //The code below we used Default function paramter in ES6 JavaScript.
    const { imageLinks = {smallThumbnail: ""}, title = "", authors = [] } = book

    return(
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
                <BookShelfChanger book={book} onUpdateShelf={onUpdateShelf}/>
            </div>
            <div className="book-title">{title}</div>
            {authors.map((author, index) => <div key={index} className="book-authors">{author}</div>)}
        </div>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
};

export default Book