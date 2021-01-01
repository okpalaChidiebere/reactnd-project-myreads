import React from 'react'
import PropTypes from 'prop-types';

class BookShelfChanger extends React.Component{

    static propTypes = {
        book: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]), //book, it may have a shlef or not. But preferably with self
        onUpdateShelf: PropTypes.func.isRequired, //function used to update the book shelf is the user want to change the shelf with select button
    }

    state = {
        value:  this.props.book.shelf ? this.props.book.shelf : "none" //default value will be none if there is no bookSelf already for this book
    }

    updateValue = (value) => {
        this.setState(() => ({
            value
        }))
    }

    bookShelfChange = event => {

        const { book, onUpdateShelf } = this.props

        /* I will not use the name value I destructed because there is no need for me to. 
        It will be useful when i have other input fields in this UI calls this same function. 
        So i will use the unique name to know which one is which one that called this function*/
        const { name, value } = event.target

        this.updateValue(value)
        console.log(book)
        onUpdateShelf(book, value)
    }

    render(){

        return(
            <div className="book-shelf-changer">
                <select onChange={this.bookShelfChange} name="book-self" value={this.state.value}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
           </div>
        )
    }
}

export default BookShelfChanger