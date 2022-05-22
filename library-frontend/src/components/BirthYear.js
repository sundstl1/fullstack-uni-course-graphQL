import { useState } from "react";

const BirthYear = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  if (!props.show) {
    return null;
  }

  const authordata = props.authors ?? [];

  if (authordata.loading) {
    return <div>loading...</div>;
  }

  const authors = authordata.data.allAuthors;

  const submit = async (event) => {
    event.preventDefault();

    console.log("setting birthyear: ", born);
    const bornInt = parseInt(born);
    props.updateBorn({
      variables: {
        name: name,
        setBornTo: bornInt,
      },
    });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value={""} key={""}></option>
            {authors.map((a) => (
              <option value={a.name} key={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYear;
