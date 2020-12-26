import { Route } from 'react-router-dom';
import './App.css';
import BooksApp from './components/BooksApp'
import SearchBook from './components/SearchBook'

function App() {
  return (
    <div className="app">
      <Route exact path='/' component={BooksApp}/>
      <Route path='/search' component={SearchBook}/>
    </div>
  );
}

export default App;
