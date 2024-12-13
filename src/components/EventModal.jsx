//  EventModal.js
import React from "react";
import { Button } from "@/components/ui/button";

const EventModal = ({
  isEditing,
  formData,
  setFormData,
  handleAddOrEditEvent,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-85 flex items-center justify-center">
      
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-3xl font-anton font-bold mb-4  bg-gradient-to-r from-emerald-500 to-emerald-900 bg-clip-text text-transparent" >
          {isEditing ? "Edit Event" : "Add Event"}
        </h3>
       
        <input
          type="text"
          placeholder="Event name"
          className="w-full border rounded p-2 mb-2"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
       
        <h2 className="font-anton bg-gradient-to-r from-emerald-500 to-emerald-900 bg-clip-text text-transparent">Start time:</h2>
        <input
          type="time"
          className="w-full border rounded p-2 mb-2 "
          value={formData.startTime}
          onChange={(e) =>
            setFormData({ ...formData, startTime: e.target.value })
          }
        />
       
        <h2 className="font-anton bg-gradient-to-r from-emerald-500 to-emerald-900 bg-clip-text text-transparent">End time:</h2>
        <input
          type="time"
          className="w-full border rounded p-2 mb-2"
          value={formData.endTime}
          onChange={(e) =>
            setFormData({ ...formData, endTime: e.target.value })
          }
        />
       
        <textarea
          placeholder="Optional description"
          className="w-full border rounded p-2 mb-4"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
       
       
        <div className="flex justify-end space-x-2">
          <Button
                  variant="outline"
                  onClick={closeModal}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={handleAddOrEditEvent}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isEditing ? "Save Changes" : "Add Event"}
          </Button>
        </div>
      
      </div>
    </div>
  );
};

export default EventModal;
