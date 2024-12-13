import React from "react";
import { Button } from "@/components/ui/button";


const FilterBar = ({ filterDate, setFilterDate, handleFilterSearch, goToToday }) => {
  return (
    <div className="flex justify-between items-center px-4 pb-4 ">
      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        className="p-2 border rounded w-3/4 font-anton"
      />
      <Button
        variant="outline"
        onClick={handleFilterSearch}
        className="p-1 hover:bg-gradient-to-r from-emerald-400 to-cyan-400"
      >
        Search
      </Button>
      <Button
        variant="secondary"
        onClick={goToToday}
        className="p-1 hover:bg-gradient-to-r from-amber-200 to-yellow-400"
      >
        Today
      </Button>
    </div>
  );
};

export default FilterBar;
