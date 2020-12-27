import React from 'react'
import { Route } from 'react-router-dom';
import BookShelves from './BookShelves'
import SearchBook from './SearchBook'

class BooksApp extends React.Component {

    state = {

        shelves: {
          
          currentlyReading: {
            name: 'currentlyReading',
          },
          wantToRead: {
            name: 'wantToRead',
          },
          read: {
            name: 'read',
          }
        },

        shelfBooks : {}
    }
    
    render(){
    
        return (
          <div >
            <Route exact path='/' render={() => (
              <BookShelves />
            )}/>
            <Route path='/search' render={() => (
              <SearchBook />
            )}/>
          </div>
        )
    }
}

export default BooksApp