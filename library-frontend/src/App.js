import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import BirthYear from "./components/BirthYear";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, UPDATE_BORN } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });
  const [updateBorn] = useMutation(UPDATE_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} authors={authors} />
      <BirthYear
        show={page === "authors"}
        updateBorn={updateBorn}
        authors={authors}
      />

      <Books show={page === "books"} books={books} />

      <NewBook show={page === "add"} addBook={addBook} />
    </div>
  );
};

export default App;
