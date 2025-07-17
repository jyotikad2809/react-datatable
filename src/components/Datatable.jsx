export default function Datatable({
  users = [],
  headers = [],
  loading = false,
  error = false,
  errorMessage = "",
}) {
  return (
    <>
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
