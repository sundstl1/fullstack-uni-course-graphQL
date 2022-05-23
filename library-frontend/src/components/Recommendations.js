import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Recommendations = (props) => {
  const params = { variables: { genre: null } };
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, params);

  if (props.genre.loading || loading) {
    return <div>loading...</div>;
  }
  const genre = props.genre.data.me.favoriteGenre;
  console.log(genre);
  refetch({ genre: genre });

  if (!props.show) {
    return null;
  }

  const bookData = data ?? [];
  console.log(bookData);

  const books = bookData.allBooks;
  console.log(books);

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre <b>{genre}</b>
      </p>
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
    </div>
  );
};

export default Recommendations;
