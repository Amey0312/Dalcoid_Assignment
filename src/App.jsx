//Importing all the components
import React from "react";
import Calendar from "./components/Calender";

const App = () => {
  return (
    <div className="app-container">
      {/* <header className="bg-blue-600 text-white p-4 text-center font-bold text-xl">
        Event Calendar
      </header> */}
      <main className="bg-gradient-to-r from-slate-500 to-slate-800">
        <Calendar />
      </main>
    </div>
  );
};

export default App;
