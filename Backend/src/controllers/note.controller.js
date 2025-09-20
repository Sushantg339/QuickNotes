const noteModel = require("../models/notes.model");

const createNoteController = async (req, res) => {
    try {
        const { title, content } = req.body;
        const user = req.user;

        const note = await noteModel.create({ user: user._id, title, content });

        return res.status(201).json({
        message: "Note created successfully",
        note: {
            id: note._id,
            title: note.title,
            content: note.content,
            user: note.user,
            createdAt: note.createdAt
        }
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error creating note: ${error.message}`
        });
    }
};

const getNotesController = async (req, res) => {
    try {
        const { _id } = req.user;
        const notes = await noteModel.find({ user: _id }).sort({ createdAt: -1 });

        const formattedNotes = notes.map(note => ({
            id: note._id,
            title: note.title,
            content: note.content,
            user: note.user,
            createdAt: note.createdAt
        }));

        return res.status(200).json({
            message: "Notes fetched successfully",
            notes: formattedNotes
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error fetching notes: ${error.message}`
        });
    }
};

const updateNoteController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const note = await noteModel.findById(id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to update this note" });
        }

        note.title = title;
        note.content = content;
        await note.save();

        return res.status(202).json({
            message: "Note updated successfully",
            note: {
                id: note._id,
                title: note.title,
                content: note.content,
                user: note.user,
                updatedAt: note.updatedAt
            }
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error updating note: ${error.message}`
        });
    }
};

const deleteNoteController = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await noteModel.findById(id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this note" });
        }

        await note.remove();

        return res.status(200).json({
            message: "Note deleted successfully",
            note: {
                id: note._id,
                title: note.title,
                content: note.content,
                user: note.user
            }
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error deleting note: ${error.message}`
        });
    }
};

module.exports = { createNoteController, getNotesController, updateNoteController, deleteNoteController };
