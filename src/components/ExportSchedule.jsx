import React from 'react'
import { Button } from "@/components/ui/button";

const ExportSchedule = ({ events, selectedDate }) => {
const filteredEvents = events.filter((event) => event.date === selectedDate);

  const exportAsJSON = () => {
    const jsonData = JSON.stringify(filteredEvents, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `schedule_${selectedDate}.json`;
    link.click();
  };

  const exportAsCSV = () => {
    const headers = ["Name", "Start Time", "End Time", "Description"];
    const csvContent = [
      headers.join(","), // Add header row
      ...filteredEvents.map(
        (event) =>
          `"${event.name}","${event.startTime}","${event.endTime}","${event.description || ""}"`
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `schedule_${selectedDate}.csv`;
    link.click();
  };

  return (
    <div className="flex space-x-4 h-[4rem] mt-4">
      <Button
        variant='outline'
        onClick={exportAsJSON}
        className="p-2 bg-teal-400  bg-clip-text text-transparent rounded  hover:bg-gradient-to-r from-emerald-500 to-emerald-900 hover:text-white"
      >
        Export as JSON
      </Button>
      <Button
        variant='outline'
        onClick={exportAsCSV}
        className="p-2 bg-lime-500 bg-clip-text text-transparent rounded hover:bg-gradient-to-r from-emerald-500 to-emerald-900 hover:text-white"
      >
        Export as CSV
      </Button>
    </div>
  );
};



export default ExportSchedule;