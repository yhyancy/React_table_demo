import Table from "./components/Table/index.tsx";
import "./App.css";

const columns = [
  { key: "id", title: "ID", sortable: true },
  { key: "name", title: "Name", sortable: true },
  { key: "age", title: "Age", sortable: true },
  { key: "email", title: "Email", sortable: true },
];

const data = [
  { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
  { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
  { id: 3, name: "Charlie", age: 20, email: "charlie@example.com" },
  { id: 4, name: "David", age: 35, email: "david@example.com" },
  { id: 5, name: "Eve", age: 28, email: "eve@example.com" },
  { id: 6, name: "Frank", age: 22, email: "frank@example.com" },
];

function App() {
  return (
    <div className="App">
      <Table data={data} columns={columns} fixedColumns={1} />
    </div>
  );
}

export default App;
