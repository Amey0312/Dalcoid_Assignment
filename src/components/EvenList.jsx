// EventList.js
import React from "react";


const formatTime = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; // Convert hour to 12-hour format
  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

const EventList = ({ events, selectedDate, handleEditEvent, handleDeleteEvent }) => {
  const filteredEvents = events.filter((event) => event.date === selectedDate);

  return (
    <div className="mt-4">
      <h3 className="text-3xl font-bold font-anton text-white mb-4 border-b border-gray-400  ">
        Events for {selectedDate || "No Date Selected"}
      </h3>
      <div className="space-y-2">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div key={index} className="p-2  rounded-xl bg-gradient-to-r from-slate-700 to-slate-900">
              <div className="font-medium flex justify-between items-center">
                <span className="font-anton text-2xl text-white">{event.name}</span>
                <div className="space-x-2">

                  
                  <button
                    onClick={() => handleEditEvent(index)}
                    className="p-2 text-blue-500 rounded hover:bg-gradient-to-r from-purple-500 to-purple-900 hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(index)}
                    className="p-2 text-red-500 rounded hover:bg-gradient-to-r from-red-500 to-orange-500 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="text-sm font-anton text-white">
                 {formatTime(event.startTime)} -  {formatTime(event.endTime)}
              </div>
              {event.description && (
                <div className="text-lg font-anton text-gray-500">{event.description}</div>
              )}
            </div>
          ))
        ) : (
          <div className="text-xl font-anton text-gray-500  ">No events for this day.</div>
        )}
      </div>
    </div>
  );
};

export default EventList;
