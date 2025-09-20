import CreateNote from "../components/CreateNote";
import NotesList from "../components/NotesList";

const Home = () => {
  return (
    <div className="min-h-[89vh] bg-gray-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <CreateNote />

      <NotesList />
    </div>
  );
};

export default Home;
