import { useDispatch } from "react-redux";
import { deleteNote, changeNote } from "../redux/actions/NoteAction";
import { toast } from "react-toastify";
import { useState } from "react";

const NoteCard = ({ note }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: note.title,
    content: note.content,
  });

  const handleDelete = () => {
    try {
        dispatch(deleteNote(note._id));
      toast.success("Note Deleted Successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Error deleting note");
    }
  };

  const handleUpdate =() => {
  try {
    dispatch(changeNote(note._id, formData)); 
    toast.success("Note Updated Successfully");
    setOpen(false);
  } catch (error) {
    toast.error("Error updating note");
  }
};


  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      {/* Note Card */}
      <div
        className="w-[48%] p-4 border border-gray-200 rounded-lg flex flex-col justify-between bg-white shadow-md cursor-pointer hover:shadow-xl transition-all duration-300"
        onClick={() => setOpen(true)}
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {(note.content)}
          </p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-500">Created: {formattedDate}</span>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] max-w-[90%]">
            {!isEditing ? (
              <>
                <h2 className="text-2xl font-bold mb-3">{note.title}</h2>
                <p className="text-gray-700 mb-4 whitespace-pre-line">
                  {note.content}
                </p>
                <p className="text-xs text-gray-500 mb-6">
                  Created on: {formattedDate}
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    Update Note
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Delete Note
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">Update Note</h2>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-3 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="5"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NoteCard;
