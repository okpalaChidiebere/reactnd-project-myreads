import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

class Book extends React.Component{

    static propTypes = {
        book: PropTypes.object.isRequired, //book from search API without self
        onUpdateShelf: PropTypes.func.isRequired, //function used to update the book shelf is the user want to change the shelf with select button
        shelf: PropTypes.string.isRequired, //shelf this book belongs to if the user has it in their shelf already. This will help reflect this in the select button
        onhandleUpdateIsBulkShelfMove: PropTypes.func.isRequired
    }

    state = {
        isChecked: false,
    }

    toggleChange = () => {

        const { book, onhandleUpdateIsBulkShelfMove } = this.props
        this.setState((currState) => ({
            isChecked: !currState.isChecked
        }))
        //console.log(book)
        onhandleUpdateIsBulkShelfMove(book, !this.state.isChecked)
    }

    render(){

        const { onUpdateShelf, book } = this.props

        //The code below we used Default function paramter in ES6 JavaScript.
        const { imageLinks = {smallThumbnail: ""}, title = "", authors = [] } = book
        
        return(
            <div className="book">
                <input 
                type="checkbox" 
                checked={this.state.isChecked}
                onChange={this.toggleChange}
                />
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
                    {!this.state.isChecked && <BookShelfChanger book={book} onUpdateShelf={onUpdateShelf}/>}
                </div>
                <div className="book-title">{title}</div>
                {authors.map((author, index) => <div key={index} className="book-authors">{author}</div>)}
            </div>
        )

    }
}

export default Book