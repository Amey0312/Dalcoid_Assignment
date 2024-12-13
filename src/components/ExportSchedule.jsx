// The ExportSchedule component allows users to export filtered event data 
// based on the selected date either as a JSON or CSV file.
import React from 'react'
import { Button } from "@/components/ui/button";



const ExportSchedule = ({ events, selectedDate }) => {
const filteredEvents = events.filter((event) => event.date === selectedDate);

  //Important feature
  const exportAsJSON = () => {
    const jsonData = JSON.stringify(filteredEvents, null, 2);  // Convert filtered events to a JSON string with pretty formatting
    // Create a Blob object for the JSON data
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");  // Create a temporary link to download the file
    link.href = URL.createObjectURL(blob);
    link.download = `schedule_${selectedDate}.json`;   // Set the file name based on the selected date
    link.click(); //Click to download the file 
  };



// Function to export filtered events as a CSV file
  const exportAsCSV = () => {
    const headers = ["Name", "Start Time", "End Time", "Description"];  // Define headers
    const csvContent = [
      headers.join(","), // Join headers with commas
      ...filteredEvents.map(
        (event) =>
          `"${event.name}","${event.startTime}","${event.endTime}","${event.description || ""}"`
      ),   // Map event data to CSV rows
    ].join("\n");             // Join all rows with newlines

    const blob = new Blob([csvContent], { type: "text/csv" });  //Same as above
    const link = document.createElement("a");       //temporary link as 'a'
    link.href = URL.createObjectURL(blob);
    link.download = `schedule_${selectedDate}.csv`;    //Set the file name based on the selected date
    link.click();  //Click to download
  };

  return (
    <div className="flex space-x-4 h-[4rem] mt-4">
      <Button
        variant='outline'
        onClick={exportAsJSON}    //trigger
        className="p-2 bg-teal-400  bg-clip-text text-transparent rounded  hover:bg-gradient-to-r from-emerald-500 to-emerald-900 hover:text-white"
      >
        Export as JSON
      </Button>
      <Button
        variant='outline'
        onClick={exportAsCSV}       //trigger
        className="p-2 bg-lime-500 bg-clip-text text-transparent rounded hover:bg-gradient-to-r from-emerald-500 to-emerald-900 hover:text-white"
      >
        Export as CSV
      </Button>
    </div>
  );
};



export default ExportSchedule;