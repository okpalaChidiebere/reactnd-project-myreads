import React from 'react'
import PropTypes from 'prop-types';

class BookShelfChanger extends React.Component{

    static propTypes = {
        book: PropTypes.object.isRequired,
    }

    constructor(props){
        super(props);

        const { book, onUpdateShelf } = this.props

        this.book = book
        this.onUpdateShelf = onUpdateShelf

        this.state = {
            value: book.shelf = 'none' //default value will be none if there is no bookSelf already for this book
        }

    }

    updateValue = (value) => {
        this.setState(() => ({
            value
        }))
    }

    bookShelfChange = event => {
    
        /* I will not use the name value I destructed because there is no need for me to. 
        It will be useful when i have other input fields in this UI calls this same function. 
        So i will use the unique name to know which one is which one that called this function*/
        const { name, value } = event.target

        this.updateValue(value)
        this.onUpdateShelf(this.book, value)
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