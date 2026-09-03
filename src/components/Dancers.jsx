import React from "react";

function Dancer(props) {
  const {
    filteredDancers,
    search,
    setSearch,
    changeAvailability,
    setSelectedDancer,
    selectedDancer,
  } = props;

  return (
    <div className="flex flex-col items-center justify-center bg-purple-300 w-full">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold py-4 text-white">I.P.E</h1>
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
            key={dancer.id}
            className={`bg-green-300 p-4 my-2 rounded-lg ${selectedDancer?.id === dancer.id ? "bg-green-400" : "bg-green-300"} hover:bg-green-400 transition-colors duration-300 w-xl`}
            onClick={() => {
              if (dancer.available) {
                if (dancer.id === selectedDancer?.id) {
                  setSelectedDancer(null);
                  console.log("quitaste la seleccion");
                } else {
                  setSelectedDancer(dancer);
                  console.log(`Selected dancer: ${dancer.name}`);
                }
              }
            }}>
            <div className="bg-amber-900 flex ">
              <p className="text-lg font-semibold text-white  text-center flex-initial ml-2 px-1 bg-purple-700">
                {dancer.id}.
              </p>
              <p className="text-lg font-semibold text-white text-center flex-3 bg-yellow-500 px-1">
                {dancer.name}
              </p>
              <p className="text-lg font-semibold text-white text-center flex-2 bg-blue-500 ">
                *************
              </p>
              <p
                className={`text-lg font-semibold text-white text-center flex-1 mr-2 px-1  w-1 cursor-pointer ${dancer.available ? "bg-green-500" : "bg-red-500"}`}
                // onClick={(e) => {
                //   e.stopPropagation();
                //   changeAvailability(dancer.id);
                // }}
              >
                {dancer.available ? "Available" : "Busy"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dancer;
