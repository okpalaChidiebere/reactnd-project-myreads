import React from 'react'
import Book from './Book'

const test_book = {
    title: "The Linux Command Line",
    authors: [
        "William E. Shotts, Jr.",
        "Chidiebere C Okpala."
    ],
    imageLinks: {
        smallThumbnail: "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
    },
    id: "nggnmAEACAAJ",
};

class BooksApp extends React.Component {

    render() {
      return(
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            <Book book={test_book}/>
                
                <div className="open-search">
                    <button>Add a book</button>
                </div>
            </div>
        </div>
      )
    }
}

export default BooksApp