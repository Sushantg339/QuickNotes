import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createNote } from "../redux/actions/NoteAction";
import { toast } from "react-toastify";
import { useState } from "react";

const CreateNote = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const createNoteHandler = async (data) => {
    setLoading(true);
    try {
      await dispatch(createNote(data));
      toast.success("Note Created Successfully");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error Creating Note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(createNoteHandler)}
      className="bg-gray-100 shadow-lg rounded-2xl px-8 py-10 flex flex-col gap-5"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Create a Note
      </h2>

      {/* Title */}
      <div className="flex flex-col">
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder="Title"
          className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 
            ${errors.title
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-black"}`}
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <textarea
          {...register("content", { required: "Content is required" })}
          placeholder="Write your note..."
          rows="6"
          className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 resize-none
            ${errors.content
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-black"}`}
        ></textarea>
        {errors.content && (
          <span className="text-red-500 text-sm">{errors.content.message}</span>
        )}
      </div>

      {/* Button */}
      <button
        type="submit"
        className="bg-black text-white cursor-pointer py-2 rounded-full hover:bg-gray-400 hover:text-gray-900 transition-all duration-300 flex justify-center items-center"
        disabled={loading}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "Create Note"
        )}
      </button>
    </form>
  );
};

export default CreateNote;
