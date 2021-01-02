import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

/*const test_book = {
    title: "The Linux Command Line",
    authors: [
        "William E. Shotts, Jr.",
        "Chidiebere C Okpala."
    ],
    imageLinks: {
        smallThumbnail: "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
    },
    id: "nggnmAEACAAJ",
};*/

class BookShelves extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfCategories: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired,
      };

    state = {
      booksForBulkMove: []
    }

    handleUpdateIsBulkShelfMove = (book, isChecked) => {
      this.setState((currState) => ({
          booksForBulkMove: isChecked ? currState.booksForBulkMove.filter(b => b.id !== book.id).concat(book) : currState.booksForBulkMove.filter(b => b.id !== book.id),
      }))
    }

    handleClearBooksForBulkMove = () => {
      this.setState((currState) => ({
          booksForBulkMove: []
      }))
    }

    render() {
        const { books, shelfCategories, onUpdateShelf } = this.props

        const { booksForBulkMove } = this.state

        const listMyBooksWithShelves = shelfCategories.map((shelf, index) => (
            <BookShelf
              key={index}
              shelf={shelf}
              books={books.filter((book) => book.shelf === shelf)}
              onUpdateShelf={onUpdateShelf}
              onhandleUpdateIsBulkShelfMove={this.handleUpdateIsBulkShelfMove}
            />
          ))

      return(
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            {listMyBooksWithShelves}
            {/*JSON.stringify(books)*/}
              {
                booksForBulkMove.length > 0 
                ? (
                  <div style={{
                    position: "fixed",
                    right: "25px",
                    bottom: "25px",
                  }}>
                    <BookShelfChanger
                    book={booksForBulkMove} 
                    onClearBooksForBulkMove={this.HandleClearBooksForBulkMove} 
                    onUpdateShelf={onUpdateShelf}/>
                  </div>
                  )
                : (
                  <Link
                to='/search'
                >
                    <div className="open-search">
                        <button>Add a book</button>
                    </div>
                </Link>
                )
              }  
                
            </div>
        </div>
      )
    }
}

export default BookShelves