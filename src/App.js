import { useState, useEffect } from "react";
import "./Styles.css";

const tableHeader = [
  { id: 0, label: "ID", key: "id" },
  { id: 1, label: "NAME", key: "firstName" },
  { id: 2, label: "USERNAME", key: "username" },
  { id: 3, label: "EMAIL", key: "email" },
];

export default function App() {
  const [headers, setHeaders] = useState(tableHeader);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({});
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [isDesc, setIsDesc] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://dummyjson.com/users");

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const onChangeLimit = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };
  const filteredUsers = users.filter((user) => {
    return headers.every((th) => {
      const key = th.key;
      const filterValue = (query[key] || "").trim().toLowerCase();

      if (!filterValue) return true;

      const userValue = String(user[key] || "").toLowerCase();
      return userValue.includes(filterValue);
    });
  });

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedUsers = filteredUsers.slice(start, end);
  const totalPages = Math.ceil(filteredUsers.length / limit);
  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => setPage(i)}
        style={{ fontWeight: page === i ? "bold" : "normal" }}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="container">
      <h1>Data Table</h1>

      {error && (
        <>
          <p style={{ color: "red" }}>Error: {error.message}</p>
        </>
      )}
      {loading && <p>...Loading</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              {headers.map((th) => (
                <th key={th.id}>{th.label} </th>
              ))}
            </tr>
            <tr>
              {headers.map((th) => (
                <th key={th.id}>
                  <input
                    type="text"
                    placeholder={`Search ${th.label}`}
                    value={query[th.key]}
                    onChange={(e) => {
                      setQuery((prev) => ({
                        ...prev,
                        [th.key]: e.target.value,
                      }));
                    }}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="footer">
        <select value={limit} onChange={onChangeLimit}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        {pageButtons}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
