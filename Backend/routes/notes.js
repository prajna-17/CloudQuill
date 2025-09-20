const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

const Note = require("../models/Note");

// ROUTE 1: Get all the notes using : Get "api/notes/fetchallnotes". Login required!!

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add new notes using : POST "api/notes/addnotes". Login required!!

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a Title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If errors are there return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing note using : PUT "api/notes/updatenotes". Login required!!

router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  //create a new note
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }

    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be updated and update it

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing note using : PUT "api/notes/deleteenotes". Login required!!

router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  //Find the note to be deleted and delete it
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note is deleted ", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
