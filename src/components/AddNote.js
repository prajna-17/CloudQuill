import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = ({ showAlert }) => {
  const { addNote } = useContext(noteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Note added successfully!", "success");
  };

  const onChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });

  return (
    <div className="max-w-md mx-auto my-6 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100 text-center">
        Add a Note
      </h2>
      <form className="space-y-4">
        <input
          type="text"
          name="title"
          value={note.title}
          onChange={onChange}
          placeholder="Title"
          minLength={5}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
        />
        <textarea
          name="description"
          value={note.description}
          onChange={onChange}
          placeholder="Description"
          rows={3}
          minLength={5}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
        />
        <input
          type="text"
          name="tag"
          value={note.tag}
          onChange={onChange}
          placeholder="Tag (optional)"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
        />
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          onClick={handleClick}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400 hover:bg-blue-600 hover:scale-105 transition-transform duration-200"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
