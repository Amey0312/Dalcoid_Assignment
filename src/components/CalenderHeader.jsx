// CalendarHeader.js:
//Displays the current month and year with navigation buttons for the previous and next months.
//Provides a visually appealing header with a gradient background and responsive typography.

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"  //imported from shadcn ui library


const CalendarHeader = ({ currentDate, handlePrevMonth, handleNextMonth }) => {
  return (
    <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-900 ">
     
      
      <Button 
       onClick={handlePrevMonth}
      variant="outline" size="icon"
      className="p-2 rounded-2xl"
      >
      <ChevronLeft />
    </Button>

      <h2 className="text-3xl sm:text-5xl font-bold font-bungee text-white ">
        {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
      </h2>
     
      <Button 
       onClick={handleNextMonth}
      variant="outline" size="icon"
      className="p-2 rounded-2xl "
      >
      <ChevronRight />
    </Button>
    </div>
  );
};

export default CalendarHeader;
