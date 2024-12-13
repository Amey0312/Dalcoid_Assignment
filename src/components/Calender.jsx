import React, { useState } from "react";
import { generateCalendarDays } from "./dates.js";
import CalendarHeader from "./CalenderHeader.jsx";
import FilterBar from './FilterBar.jsx'
import CalendarGrid from './CalenderGrid.jsx'
import EventList from './EvenList.jsx'
import EventModal from './EventModal.jsx'
import ExportSchedule from './ExportSchedule.jsx'


const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [filterDate, setFilterDate] = useState("");

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();
  const calendarDays = generateCalendarDays(currentMonth, currentYear);

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentYear, currentMonth - 1, 1);
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
    setCurrentDate(nextMonth);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleFilterSearch = () => {
    if (filterDate) {
      const [year, month, day] = filterDate.split("-").map(Number);
      setCurrentDate(new Date(year, month - 1, day));
      setSelectedDate(filterDate);
    }
  };

  const openModal = (day) => {
    if (day) {
      setSelectedDate(`${currentYear}-${currentMonth + 1}-${day}`);
      setShowModal(true);
    }
  };

  const handleAddOrEditEvent = () => {
    if (selectedDate && formData.name && formData.startTime && formData.endTime) {
      if (isEditing) {
        const updatedEvents = [...events];
        updatedEvents[editIndex] = { ...formData, date: selectedDate };
        setEvents(updatedEvents);
      } else {
        setEvents([...events, { date: selectedDate, ...formData }]);
      }
      setFormData({ name: "", startTime: "", endTime: "", description: "" });
      setShowModal(false);
      setIsEditing(false);
      setEditIndex(null);
    }
  };

  const handleDeleteEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const handleEditEvent = (index) => {
    const eventToEdit = events[index];
    setFormData({
      name: eventToEdit.name,
      startTime: eventToEdit.startTime,
      endTime: eventToEdit.endTime,
      description: eventToEdit.description,
    });
    setIsEditing(true);
    setEditIndex(index);
    setSelectedDate(eventToEdit.date);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditIndex(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 to-black p-4 flex flex-col sm:flex-row">
      {/* Div-1 */}
      <div className="max-w-3xl mx-1 sm:mx-0 sm:ml-[10rem] bg-gradient-to-r from-amber-100 to-emerald-100 rounded-2xl">
        <CalendarHeader
          currentDate={currentDate}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
        />
        <CalendarGrid
          calendarDays={calendarDays}
          today={today}
          currentDate={currentDate}
          events={events}
          selectedDate={selectedDate}
          filterDate={filterDate}
          openModal={openModal}
        />
        <FilterBar
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          handleFilterSearch={handleFilterSearch}
          goToToday={goToToday}
        />
      </div>

      <div className="sm:w-[30rem] mx-5">
      <EventList
        events={events}
        selectedDate={selectedDate}
        handleEditEvent={handleEditEvent}
        handleDeleteEvent={handleDeleteEvent}
      />
      </div>
      
      <ExportSchedule events={events} selectedDate={selectedDate} />
      
      {showModal && (
        <EventModal
          isEditing={isEditing}
          formData={formData}
          setFormData={setFormData}
          handleAddOrEditEvent={handleAddOrEditEvent}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Calendar;