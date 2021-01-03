Remember to follow these steps from the [Thinking in React Guide](https://reactjs.org/docs/thinking-in-react.html) when you're building your
React applications:

#### Step 1. Break down the app into a hierarchy of components. Draw a box around each React component.

|- App
|-- BooksApp
|--- Route
|---- BookShelves
|----- BookShelf
|------ Book
|------- BookShelfChanger
|---- SearchBook (Controlled Component)
|----- Book
|------ BookShelfChanger

#### Step 2. Determine the data in our app.

books (To store total list of books the user has)
books (Tos store list of books that the user searched for.)
shelves (List of shelves: currentlyReading, wantToRead, read)
query (used by the user to search for books)
isChecked (Used to know when a book is checked for bulk insert)
booksForBulkMove (Used to keep track of books added for bulk shelf move)
value (Used to keep track of the state of the select button a list of shelves a book belong s to)

#### Step 3. Figure out the data that should be a part of our state:

a)  Is it passed in from a parent via props? If so, it probably isn’t state.

b)  Does it remain unchanged over time? If so, it probably isn’t state.

c)  Can you compute it based on any other state or props in your component?
    If so, it isn’t state.

1.  books(to store myBooks) - this piece of data changes over time and cannot be computed
    based on any other state or props -> state.

2.  books(to store searched Books results) - this piece of data changes over time and cannot be computed based on any other state or props -> state.

3.  shelves - this piece of data remains unchaged over time and cannot be computed
    based on any other state or props -> not a state.

4.  query - this piece of data changes over time and cannot be computed
    based on any other state or props -> state.

5.  isChecked - this piece of data changes over time and cannot be computed
    based on any other state or props -> state.

6.  booksForBulkMove - this piece of data changes over time and cannot be computed
    based on any other state or props -> state.

7.  value - this piece of data changes over time and cannot be computed
    based on any other state or props -> state.

#### Step 4. Identify where each piece of state lives.

a)  Identify every component that renders something based on that state.

b)  If multiple components need the same piece of state, put that piece of state into those components' parent-most component.

If you can’t find a component where it makes sense to own the state, create
a new component simply for holding the state and add it somewhere in the
hierarchy above the common owner component.

(1) books:

a) this state will be needed by BookShelves Component(Purely display the list of books in the shelves of the user) and SearchBooks Component(Used to filter against the list of books returned from search API to add the shelf property so that it will reflect in the slect button).

b) The parent of both BookShelves and SearchBooks Components is the BooksApp Component, so the `books` piece of state should live there.

(2) booksForBulkMove:

a) this state will be needed by Book Component(to know whether this book will be added/removed from the list of books for bulk move) and BookShelfChanger(to know whether it will display or not).

b) The parent of both Book and BookShelfChanger Components can be SearchBook or BookShelves Component, so the
`booksForBulkMove` piece of state should live there independently to manange bulk move for both pages independently.

(3) Value:

a) this state will be need by only BookShelfChanger Component.

b)  the `value` piece of state should live there.

(4) booksForSearchResult:

a) this state will be need by only SearchBook Component.

b)  the `books` piece of state should live there.

(5) Query:

a) this state will be need by only SearchBook Component.

b)  the `query` piece of state should live there.

(6) isChecked:

a) this state will be needed by Book Component(to know whether this book will be added/removed from the list of books for bulk move).

b)  The parent of Book Components can be SearchBook or BookShelves Component(parent of BookShelf. BookShelf calls Books Component), so the
`isChecked` piece of state should live there independently to manange bulk move for both pages independently.

#### Step 5. Add Inverse Data Flow.

State should be updated inside of the component where that state lives.
If we pass state down from component A to component B and then need to update
the state based on something that happened in component B, we can do so via
callbacks: Component A will not only pass state to Component B, but it will
also pass a callback function that will fire whenever the state should be updated.

Parent components can pass pieces of state as `props`, and they can also pass
callbacks as `props`. Callbacks are passed in order to allow child components
to pass data back to the parent. Remember that state cannot be modified outside
of the component where it is defined.


#### FEW NOTES
In React, you will use Nullish coalescing operator and optional chaining operator a lot.
These are very useful operators and can be very helpful in a project.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining


To render something when a route is matched, we can also pass it as a child instead of using the render props. Example-
```js
<Route exact path='/'>
    <BookShelves books={books} shelfCategories={shelves} onUpdateShelf={this.handleUpdateShelf} />
</Route>
```
More on routing here https://reactrouter.com/web/api/Route


Good Programming practise for good app maintenance.
Common ES6 JavaScript syntax used https://github.com/airbnb/javascript
Common React good practices like functional components over class components. https://github.com/airbnb/javascript/tree/master/react
Like your NotFound page, can be just a functional components




If you want to dive deeper into React, you can visit the React documentation which has a lot of useful articles.
Here are some of the interesting ones-

Composition vs Inheritance  https://reactjs.org/docs/composition-vs-inheritance.html
React Fragments  https://reactjs.org/docs/fragments.html
Reconciliation in React  https://reactjs.org/docs/reconciliation.html
Testing React Apps  https://reactjs.org/docs/testing.html
React Hooks  https://reactjs.org/docs/hooks-intro.html
Also, with React 16.8, React Hooks is available in the stable release. Reference- React Hooks announcement  https://reactjs.org/blog/2019/02/06/react-v16.8.0.html
