import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = ({ note, updateNote, showAlert, darkMode }) => {
  const { deleteNote } = useContext(noteContext);

  return (
    <div className="p-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 bg-white text-gray-900">
      <div className="flex justify-between items-start">
        <h5 className="text-lg font-semibold">{note.title}</h5>
        <div className="flex space-x-2">
          <i
            className="fa-solid fa-pen-to-square text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => updateNote(note)}
          ></i>
          <i
            className="fa-solid fa-trash text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => {
              deleteNote(note._id);
              showAlert("Deleted Successfully", "success");
            }}
          ></i>
        </div>
      </div>
      <p className="mt-2">{note.description}</p>
      {note.tag && (
        <span className="mt-1 inline-block text-sm text-gray-500">
          {note.tag}
        </span>
      )}
    </div>
  );
};

export default NoteItem;
