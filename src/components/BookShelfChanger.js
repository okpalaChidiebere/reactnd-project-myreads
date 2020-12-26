import React from 'react'
import PropTypes from 'prop-types';

class BookShelfChanger extends React.Component{

    static propTypes = {
        bookID: PropTypes.string.isRequired,
    }

    state = {
        query: '',  //we will bind our input field to to whatever the value of a certain property of a state is
    }

    updateQuery = (query) => {
        this.setState(() => ({
          query: query.trim()
        }))
    }

    bookShelfChange = event => {
        /* I will not use the name value I destructed because there is no need for me to. 
        It will be useful when i have other input fields in this UI calls this same function. 
        So i will use the unique name to know which one is which one that called this function*/
        const { name, value } = event.target
        const bookID = this.props.bookID

        console.log (bookID)
    }

    render(){

        return(
            <div className="book-shelf-changer">
                <select onChange={this.bookShelfChange} name="book-self">
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