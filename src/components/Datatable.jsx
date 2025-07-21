import { useState } from "react";

export default function Datatable({
  users = [],
  headers = [],
  loading = false,
  error = false,
  errorMessage = "",
  paginator = false,
  row = 10,
  rowPerPage = [],
}) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(row);

  const noOfPages = Math.ceil(users.length / rowsPerPage);

  const paginatedUsers = () => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return users.slice(start, end);
  };

  const dataToRender = paginator ? paginatedUsers() : users;

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < noOfPages) setPage(page + 1);
  };

  const handleChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  return (
    <div>
      {loading && <p>...Loading</p>}
      {error && <p>{errorMessage}</p>}

      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.id}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataToRender.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {rowPerPage.length > 0 && (
        <div>
          <label>Rows per page: </label>
          <select value={rowsPerPage} onChange={handleChange}>
            {rowPerPage.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      )}

      {paginator && (
        <div>
          <button onClick={handlePrevious} disabled={page === 1}>
            Prev
          </button>
          <span style={{ margin: "0 1rem" }}>
            Page {page} of {noOfPages}
          </span>
          <button onClick={handleNext} disabled={page === noOfPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
