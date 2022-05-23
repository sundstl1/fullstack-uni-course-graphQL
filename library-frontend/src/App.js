import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";
import BirthYear from "./components/BirthYear";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { ALL_AUTHORS, ALL_GENRES, ADD_BOOK, UPDATE_BORN, ME } from "./queries";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token")
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState("authors");
  const authors = useQuery(ALL_AUTHORS);
  const client = useApolloClient();
  const me = useQuery(ME);
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_GENRES }, { query: ALL_AUTHORS }],
  });

  const [updateBorn] = useMutation(UPDATE_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
      return null;
    }
    return <div style={{ color: "red" }}>{errorMessage}</div>;
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const loginAction = (token) => {
    setToken(token);
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommendations")}>
              recommend
            </button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === "authors"} authors={authors} />
      <BirthYear
        show={page === "authors"}
        updateBorn={updateBorn}
        authors={authors}
      />
      <LoginForm
        setToken={loginAction}
        token={token}
        setError={notify}
        show={page === "login"}
      />
      <Books show={page === "books"} />
      <Recommendations show={page === "recommendations"} genre={me} />
      <NewBook show={page === "add"} addBook={addBook} />
    </div>
  );
};

export default App;
