import "./Styles.css";
export default function Datatable({ tableHead }) {
  return (
    <div className="container">
      <h1>DataTable</h1>
      <table>
        <thead>
          <tr>
            {tableHead.map((th) => (
              <th className="table-head">{th}</th>
            ))}
          </tr>
        </thead>
      </table>
    </div>
  );
}
