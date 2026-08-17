import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const dancers = [
    "Camila Valderrama",
    "Andrea Orejuela",
    "Sofia Benavides",
    "Valentina Ramirez",
    "Daniela estupiñan",
  ];
  const filteredDancers = dancers.filter((dancer) =>
    dancer.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );
  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold py-4 text-white">Private rooms</h1>
        <input
          type="text"
          placeholder="Buscar bailarina..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-4 border-gray-500 hover:border-blue-500 rounded-lg px-4 py-2 w-64 mb-4 hover:bg-amber-50
          bg-gray-400 focus:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col items-center justify-center bg-purple-300 w-full">
        <p className="text-white">Estas buscando: {search}</p>
        {filteredDancers.map((dancer, index) => (
          <div
            key={index}
            className="bg-green-300 p-4 my-2 rounded-lg  hover:bg-green-400 transition-colors duration-300 w-xl"
          >
            <div className="bg-amber-900 flex ">
              <p className="text-lg font-semibold text-white  text-center flex-initial mx-2 bg-red-700">
                {index + 1}.
              </p>
              <p className="text-lg font-semibold text-white text-center flex-2 bg-yellow-500">
                {dancer}
              </p>
              <p className="text-lg font-semibold text-white text-center flex-3 bg-blue-500 mx-2 ">
                ******************
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
