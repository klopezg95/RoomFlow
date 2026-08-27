import { useState } from "react";
import Dancer from "./components/Dancers";
import Rooms from "./components/Rooms";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [dancers, setDancers] = useState([
    {
      name: "Camila Valderrama",
      id: 1,
      available: true,
    },
    {
      name: "Andrea Orejuela",
      id: 2,
      available: true,
    },
    {
      name: "Sofia Benavides",
      id: 3,
      available: true,
    },
    {
      name: "Valentina Ramirez",
      id: 4,
      available: true,
    },
    {
      name: "Daniela estupiñan",
      id: 5,
      available: true,
    },
  ]);
  const [rooms, setRooms] = useState([
    {
      name: "Room 1",
      id: 1,
      available: true,
    },
    {
      name: "Room 2",
      id: 2,
      available: true,
    },
    {
      name: "Room 3",
      id: 3,
      available: true,
    },
    {
      name: "Room 4",
      id: 4,
      available: true,
    },
  ]);
  const [selectedDancer, setSelectedDancer] = useState(null);

  // Filter dancers based on the search input
  const filteredDancers = dancers.filter((dancer) =>
    dancer.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );
  // Function to change the availability of a dancer
  const changeAvailability = (id) => {
    const newDancers = dancers.map((dancer) => {
      if (dancer.id === id) {
        return { ...dancer, available: !dancer.available };
      }
      return dancer;
    });
    setDancers(newDancers);
  };

  return (
    <>
      <div className="flex">
        <Dancer
          filteredDancers={filteredDancers}
          search={search}
          setSearch={setSearch}
          changeAvailability={changeAvailability}
          selectedDancer={selectedDancer}
          setSelectedDancer={setSelectedDancer}
        />
        <Rooms
          rooms={rooms}
          setRooms={setRooms}
          selectedDancer={selectedDancer}
          setSelectedDancer={setSelectedDancer}
          dancers={dancers}
          setDancers={setDancers}
        />
      </div>
    </>
  );
}

export default App;
