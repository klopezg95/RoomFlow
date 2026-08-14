import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  return (
    <>
      <div>
        <h1>Private rooms</h1>
        <input
          type="text"
          placeholder="Buscar bailarina..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <p>Estas buscando: {search}</p>
    </>
  );
}

export default App;
