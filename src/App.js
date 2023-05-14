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
  { id: 7, name: "Alice1", age: 26, email: "alice2@example.com" },
  { id: 8, name: "Bob1", age: 31, email: "bob2@example.com" },
  { id: 9, name: "Charlie1", age: 21, email: "charlie2@example.com" },
  { id: 10, name: "David1", age: 36, email: "david2@example.com" },
  { id: 11, name: "Eve1", age: 28, email: "eve2@example.com" },
  { id: 12, name: "Frank1", age: 22, email: "frank2@example.com" },
  { id: 13, name: "Alice2", age: 25, email: "alice3@example.com" },
  { id: 14, name: "Bob2", age: 30, email: "bob3@example.com" },
  { id: 15, name: "Charlie2", age: 20, email: "charlie3@example.com" },
  { id: 16, name: "David2", age: 35, email: "david3@example.com" },
  { id: 17, name: "Eve2", age: 28, email: "eve3@example.com" },
  { id: 18, name: "Frank2", age: 22, email: "frank3@example.com" },
  { id: 19, name: "Alice3", age: 25, email: "alice4@example.com" },
  { id: 20, name: "Bob3", age: 30, email: "bob4@example.com" },
  { id: 21, name: "Charlie3", age: 20, email: "charlie4@example.com" },
  { id: 22, name: "David3", age: 35, email: "david4@example.com" },
  { id: 23, name: "Eve3", age: 28, email: "eve4@example.com" },
  { id: 24, name: "Frank3", age: 22, email: "frank4@example.com" },
];

function App() {
  return (
    <div className="App">
      <Table data={data} columns={columns} fixedColumns={1} />
    </div>
  );
}

export default App;
