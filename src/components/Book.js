import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

class Book extends React.Component{

    static propTypes = {
        book: PropTypes.object.isRequired, //book from search API without self
        onUpdateShelf: PropTypes.func.isRequired, //function used to update the book shelf is the user want to change the shelf with select button
        shelf: PropTypes.string.isRequired //shelf this book belongs to if the user has it in their shelf already. This will help reflect this in the select button
    }

    constructor(props){
        super(props)

        const { onUpdateShelf, book, shelf, onhandleUpdateIsBulkShelfMove} = this.props

        this.onUpdateShelf = onUpdateShelf
        this.book = book
        this.shelf = shelf
        this.onhandleUpdateIsBulkShelfMove = onhandleUpdateIsBulkShelfMove
        
        this.state = {
            isChecked: false,
        }

    }

    toggleChange = () => {
        this.setState((currState) => ({
            isChecked: !currState.isChecked
        }))

        this.onhandleUpdateIsBulkShelfMove(this.book, !this.state.isChecked)
    }

    render(){
        
        const { book , shelf, onUpdateShelf } = this

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
                <input 
                type="checkbox" 
                checked={this.state.isChecked}
                onChange={this.toggleChange}
                />
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
                    {!this.state.isChecked && <BookShelfChanger book={bookWithSelf} onUpdateShelf={onUpdateShelf}/>}
                </div>
                <div className="book-title">{title}</div>
                {authors.map((author, index) => <div key={index} className="book-authors">{author}</div>)}
            </div>
        )

    }
}

export default Book