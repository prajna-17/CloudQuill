import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = ({ showAlert, darkMode }) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const [search, setSearch] = useState(""); // <-- search state

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("Updated Successfully", "success");
  };

  const onChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });

  // Filter notes based on search query
  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase()) ||
      (n.tag && n.tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <AddNote showAlert={showAlert} darkMode={darkMode} />

      {/* Hidden modal trigger */}
      <button
        ref={ref}
        type="button"
        className="hidden"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
      >
        Launch modal
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className={`modal-content ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <div className="modal-header">
              <h5 className="modal-title">Edit Note</h5>
              <button
                type="button"
                className={`btn-close ${darkMode ? "bg-gray-700" : ""}`}
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form className="space-y-4">
                <div>
                  <label htmlFor="etitle" className="block mb-1 font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    placeholder="Enter title"
                    minLength={5}
                    required
                    className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300 focus:ring-blue-500"
                        : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
                    }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="edescription"
                    className="block mb-1 font-medium"
                  >
                    Description
                  </label>
                  <textarea
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    rows="3"
                    placeholder="Enter description"
                    minLength={5}
                    required
                    className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300 focus:ring-blue-500"
                        : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="etag" className="block mb-1 font-medium">
                    Tag
                  </label>
                  <input
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    placeholder="Add a Tag"
                    className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300 focus:ring-blue-500"
                        : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
                    }`}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleClick}
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:bg-gray-400"
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="mt-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full mb-4 px-4 py-2 rounded border focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300 focus:ring-blue-500"
              : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
          }`}
        />

        {/* Heading */}
        <h2
          className={`text-2xl font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Your Notes
        </h2>

        {/* No notes message */}
        {filteredNotes.length === 0 && (
          <p className={`${darkMode ? "text-white" : "text-gray-700"}`}>
            No notes to display
          </p>
        )}

        {/* Notes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <NoteItem
              key={note._id}
              updateNote={updateNote}
              showAlert={showAlert}
              note={note}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Notes;
