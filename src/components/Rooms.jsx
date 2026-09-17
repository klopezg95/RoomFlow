import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faDoorOpen } from "@fortawesome/free-solid-svg-icons";

function Rooms(props) {
  const { rooms, setRooms, selectedDancer, setSelectedDancer, dancers, setDancers } = props;
  const [roomToRelease, setRoomToRelease] = useState(null);
  // Function to assign a dancer to a room
  const assignDancerToRoom = (roomId) => {
    if (!selectedDancer) {
      return;
    }
    const newRooms = rooms.map((room) => {
      if (room.id === roomId) {
        if (room.available) {
          const newDancers = dancers.map((dancer) => {
            if (dancer.id === selectedDancer.id) {
              return { ...dancer, available: false };
            }
            return dancer;
          });
          setSelectedDancer(null);
          setDancers(newDancers);
          return {
            ...room,
            dancer: selectedDancer.name,
            available: false,
            startTime: Date.now(),
          };
        } else {
          alert("This room is already occupied. Please select another room.");
          return room;
        }
      }
      return room;
    });
    setRooms(newRooms);
  };
  // Function to release a room and make the dancer available again
  const releaseRoom = (roomId) => {
    const newRooms = rooms.map((room) => {
      if (room.id === roomId) {
        if (room.available) {
          return room;
        }
        const newDancers = dancers.map((dancer) => {
          if (room.dancer === dancer.name) {
            return { ...dancer, available: true };
          }
          return dancer;
        });
        setDancers(newDancers);
        return {
          ...room,
          dancer: null,
          available: true,
          startTime: null,
          pause: false,
          pauseTime: null,
        };
      }
      return room;
    });
    setRooms(newRooms);
  };
  // Function to calculate elapsed time
  const getElapsedTime = (currentRoom) => {
    let elapsedTime = 0;
    if (currentRoom.startTime) {
      if (!currentRoom.pause) {
        elapsedTime = Date.now() - currentRoom.startTime;
      } else {
        elapsedTime = currentRoom.pauseTime - currentRoom.startTime;
      }
    }
    const seconds = (Math.floor(elapsedTime / 1000) % 60).toString().padStart(2, "0");
    const minutes = (Math.floor(elapsedTime / 60000) % 60).toString().padStart(2, "0");
    const hours = Math.floor(elapsedTime / 3600000)
      .toString()
      .padStart(2, "0");
    return { hours, minutes, seconds };
  };
  // Function to pause a room
  const pauseRoom = (roomId) => {
    const newRooms = rooms.map((room) => {
      if (room.id === roomId) {
        //PAUSE
        if (!room.pause) {
          return { ...room, pause: !room.pause, pauseTime: Date.now() };
        }
        //RESUME
        const pausedDuration = Date.now() - room.pauseTime;

        const adjustedStartTime = room.startTime + pausedDuration;
        return { ...room, pause: false, startTime: adjustedStartTime, pauseTime: null };
      }
      return room;
    });
    setRooms(newRooms);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-blue-300">
      <h1 className="text-4xl font-bold py-4 text-white">Private rooms</h1>
      <div>
        {rooms.map((room) => {
          const { hours, minutes, seconds } = getElapsedTime(room);
          return (
            <div
              key={room.id}
              className="flex flex-col items-center justify-center bg-purple-300 w-full h-auto p-4 my-2 rounded-lg  hover:bg-purple-400 transition-colors duration-300"
              onClick={() => {
                console.log(`Selected room: ${room.id}`);
                assignDancerToRoom(room.id);
              }}>
              <p className=" text-2xl flex flex-col items-center justify-center bg-purple-300 w-full px-1 text-white">
                {room.name}
              </p>
              {room.dancer && (
                <p className="text-lg font-semibold text-white text-center flex-1 px-1  w-full bg-blue-500">
                  {room.dancer}
                </p>
              )}
              <p className="text-lg font-semibold text-white text-center flex-1 px-1  w-full bg-blue-500">
                {hours !== "00" ? `${hours}:` : ""}
                {minutes}:{seconds}
              </p>
              <p
                className={`text-lg font-semibold text-white text-center flex-1 px-1  w-full ${room.available ? "bg-green-500" : "bg-red-500"}`}>
                {room.available ? "Available" : "Occupied"}
              </p>
              {room.dancer && (
                <div className="flex flex-row items-center justify-between w-full">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("RELEASE CLICK:", room.id);
                      setRoomToRelease(room.id);
                      // releaseRoom(roomToRelease);
                    }}
                    className="bg-blue-300 rounded-lg w-auto p-2 mt-2 cursor-pointer text-white
                hover:bg-blue-900
                 ">
                    <FontAwesomeIcon icon={faDoorOpen} />
                    <span>Release</span>
                  </button>
                  <button
                    className="bg-blue-500 rounded-lg w-15 p-2 mt-2 cursor-pointer text-white
                hover:bg-blue-900"
                    onClick={(e) => {
                      e.stopPropagation();
                      pauseRoom(room.id);
                    }}>
                    {room.pause ? (
                      <FontAwesomeIcon icon={faPlay} />
                    ) : (
                      <FontAwesomeIcon icon={faPause} />
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {/* Release confirmation dialog MODAL */}
        {roomToRelease && (
          // Release confirmation or additional UI can be added here
          <div className=" fixed inset-0 flex flex-col items-center justify-center bg-black/50">
            <div className="bg-gray-800 p-4 rounded-lg ">
              <p className="text-white text-2xl">
                Are you sure you want to release the room {roomToRelease}
              </p>
              <div className="flex justify-center mt-2">
                <button
                  className="bg-green-500 rounded-lg w-auto p-2 mt-2 mr-2 cursor-pointer text-white
                         hover:bg-green-700"
                  onClick={() => {
                    releaseRoom(roomToRelease);
                    setRoomToRelease(null);
                  }}>
                  Confirm
                </button>
                <button
                  className="bg-red-500 rounded-lg w-auto p-2 mt-2 ml-2 cursor-pointer text-white
                         hover:bg-red-700"
                  onClick={() => setRoomToRelease(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Rooms;
