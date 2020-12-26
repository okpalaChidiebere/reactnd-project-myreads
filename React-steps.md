Remember to follow these steps from the [Thinking in React Guide](https://reactjs.org/docs/thinking-in-react.html) when you're building your
React applications:

#### Step 1. Break down the app into a hierarchy of components. Draw a box around each React component.

|- App
|-- BooksApp
|--- Route
|---- BookShelf
|----- Book
|------ BookShelfChanger
|---- SearchBook (Controlled Component)
|----- Book
|------ BookShelfChanger

#### Step 2. Determine the data in our app.

books (To store total list of books the user has)
shelf (To where a user can put the books the liked)
query (used by the user to search for books)

#### Step 3. Figure out the data that should be a part of our state:

a)  Is it passed in from a parent via props? If so, it probably isn’t state.

b)  Does it remain unchanged over time? If so, it probably isn’t state.

c)  Can you compute it based on any other state or props in your component?
    If so, it isn’t state.

1.  books - this piece of data changes over time and cannot be computed
    based on any other state or props -> state.

2.  shelf - this piece of data changes over time and cannot be computed
    based on any other state or props -> state.

3.  query - this piece of data changes over time and cannot be computed
    based on any other state or props -> state.

#### Step 4. Identify where each piece of state lives.

a)  Identify every component that renders something based on that state.

b)  If multiple components need the same piece of state, put that piece of state into those components' parent-most component.

If you can’t find a component where it makes sense to own the state, create
a new component simply for holding the state and add it somewhere in the
hierarchy above the common owner component.

(1) books:

a) this state will be need by BookShelf Component and Book.

b) The parent of both BookShelf Components is the App Component, so the
`books` piece of state should live there.

(2) shelf:

a) this state will be need by BookShelf Component and Book.

b) The parent of both BookShelf Components is the App Component, so the
`shelves` piece of state should live there.

(3) Query:

a) this state will be need by only SearchBook Component.

b)  the `Query` piece of state should live there.

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