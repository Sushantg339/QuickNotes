import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/actions/UserAction";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchUser()); 
      setLoading(false); 
    };
    fetch();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <MainRoutes />;
};

export default App;
