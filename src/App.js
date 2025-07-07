import DataTable from "./DataTable.js";
import { useState, useEffect } from "react";
const head = ["name", "age", "occupation", "id"];
function App() {
  const [tableHead, setTableHead] = useState(head);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiCall = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!apiCall.ok) {
          throw Error("something went wrong");
        }
        const response = await apiCall.json();
        setData([response]);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      console.log("Fetched data:", data);
    }
  }, [data]);
  return (
    <>
      <DataTable
        tableHead={tableHead}
        tableData={data}
        loading={loading}
        error={error}
      />
    </>
  );
}

export default App;
