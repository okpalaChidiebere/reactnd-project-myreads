import React from 'react'

const BookShelf = props => {
    /** This will later be filled out. This component is not connected to anything yet*/
    const { books, bookIDsForThisBookSelf, shelfInfo } = props

    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                        <li> <Book /> </li>
                </ol>
            </div>
        </div>
    )
}

export default BookShelf