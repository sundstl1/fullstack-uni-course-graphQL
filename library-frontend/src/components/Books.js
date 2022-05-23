import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";

const Books = (props) => {
  const params = { variables: { genre: null } };
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, params);

  const genresQuery = useQuery(ALL_GENRES);
  if (!loading) {
    console.log(data.allBooks.length);
  }
  if (!props.show) {
    return null;
  }

  const bookData = data ?? [];

  if (loading || genresQuery.loading) {
    return <div>loading...</div>;
  }

  const books = bookData.allBooks;

  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const mappedGenres = genresQuery.data.allBooks.map((b) => b.genres);
  const genres = [].concat.apply([], mappedGenres).filter(onlyUnique);

  const submit = async (genre) => {
    console.log("filtering books...", genre);
    params.variables = {
      genre,
    };
    refetch({ genre: genre });
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button
          key={g}
          onClick={() => {
            submit(g);
          }}
        >
          {g}
        </button>
      ))}
      <button
        key={"all genres"}
        onClick={() => {
          submit("");
        }}
      >
        all genres
      </button>
    </div>
  );
};

export default Books;
