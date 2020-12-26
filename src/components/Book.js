import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

const Book = props => {

    const { imageLinks, title, authors, id } = props.book

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
    imageLinks: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
};

export default Book