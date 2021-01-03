import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'
import insertImage from '../icons/insertImage.svg'

class Book extends React.Component{

    static propTypes = {
        book: PropTypes.object.isRequired, //book from search API with shelf propert added to it in code
        onUpdateShelf: PropTypes.func.isRequired, //function used to update the book shelf is the user want to change the shelf with select button
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
        const { imageLinks = {smallThumbnail: ''}, title = "", authors = [] } = book
        
        return(
            <div className="book">
                <input 
                type="checkbox" 
                checked={this.state.isChecked}
                onChange={this.toggleChange}
                />
                <div 
                className="book-top" style={imageLinks.smallThumbnail === '' ? { boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'}: {}}>
                    {
                        imageLinks.smallThumbnail !== '' 
                        ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
                        : <img src={insertImage} alt="Thumbnail for book not found" style={{ display: 'block', margin: 'auto' }}/>
                    }
                    
                    {!this.state.isChecked && <BookShelfChanger book={book} onUpdateShelf={onUpdateShelf}/>}
                </div>
                <div className="book-title">{title}</div>
                {authors.map((author, index) => <div key={index} className="book-authors">{author}</div>)}
            </div>
        )

    }
}

export default Book