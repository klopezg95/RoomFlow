import React from "react";

function Rooms(props) {
  const { rooms } = props;
  return (
    <div className="flex flex-col items-center justify-center w-full bg-blue-300">
      <h1 className="text-4xl font-bold py-4 text-white">Private rooms</h1>
      <div>
        {rooms.map((room) => (
          <div
            key={room.id}
            className="flex flex-col items-center justify-center bg-purple-300 w-full p-4 my-2 rounded-lg  hover:bg-purple-400 transition-colors duration-300">
            <p className=" text-2xl flex flex-col items-center justify-center bg-purple-300 w-full px-1 text-white">
              {room.name}
            </p>
            {room.dancer && (
              <p className="text-lg font-semibold text-white text-center flex-1 px-1  w-full bg-blue-500">
                {room.dancer}
              </p>
            )}
            <p
              className={`text-lg font-semibold text-white text-center flex-1 px-1  w-full ${room.available ? "bg-green-500" : "bg-red-500"}`}>
              {room.available ? "Available" : "Occupied"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Rooms;
