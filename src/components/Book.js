import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

const Book = props => {

    //The code below we used Default function paramter in ES6 JavaScript.
    const { id = "", imageLinks = {smallThumbnail: ""}, title = "", authors = [] } = props.book

    return(
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
                <BookShelfChanger bookID={id}/>
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