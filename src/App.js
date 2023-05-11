import Table from "./components/Table/index.tsx";

const columns = [
  { header: 'ID', accessor: 'id', sortable: true },
  { header: 'Name', accessor: 'name' },
  { header: 'Age', accessor: 'age', sortable: true },
  { header: 'Email', accessor: 'email' },
];

const data = [
  { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
  { id: 3, name: 'Charlie', age: 20, email: 'charlie@example.com' },
  { id: 4, name: 'David', age: 35, email: 'david@example.com' },
  { id: 5, name: 'Eve', age: 28, email: 'eve@example.com' },
  { id: 6, name: 'Frank', age: 22, email: 'frank@example.com' },
];

function App() {
  return (
    <div className="App">
      <Table data={data} columns={columns} />
    </div>
  );
}

export default App;