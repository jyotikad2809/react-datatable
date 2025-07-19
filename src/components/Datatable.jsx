import { useState } from "react";
export default function Datatable({
  users = [],
  headers = [],
  loading = false,
  error = false,
  errorMessage = "",
  paginator = false,
  row = 10,
  rowPerPage = [5, 10, 20],
}) {
  const [page, setPage] = useState(row);
  const noOfPages = Math.ceil(users.length / row);
  const paginatedUsers = () => {
    const start = (page - 1) * row;
    const end = start + row;
    return users.slice(start, end);
  };
  const dataToRender = paginator ? paginatedUsers() : users;
  const handlePrevious = () => {
    setPage(page - 1);
  };
  const handleNext = () => {
    setPage(page + 1);
  };
  return (
    <div>
      {loading && <p>Loading....</p>}
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
      {paginator && (
        <div>
          <button onClick={handlePrevious} disabled={page === 1}>
            Pre
          </button>
          {`${page} of ${noOfPages}`}
          <button onClick={handleNext} disabled={page === noOfPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
