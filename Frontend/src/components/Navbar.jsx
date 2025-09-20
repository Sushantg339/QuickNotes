import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/UserAction";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { user } = useSelector((state) => state.user);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      dispatch(logoutUser());
      toast.success("Logout Successfull. See you Soon!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error Logging Out");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="h-20 w-full px-7 flex justify-between shadow-xl rounded-xl relative">
      <NavLink
        to={"/home"}
        className="logo h-full w-55 p-5 flex justify-center items-center"
      >
        <img
          src="/images/logo.png"
          alt="logo"
          className="h-full w-full object-cover"
        />
      </NavLink>
      <div
        id="left-part"
        className="flex gap-7 justify-center items-center h-full px-5 py-3 relative"
      >
        <button
          type="submit"
          className="px-10 py-3 rounded-xl bg-red-500 cursor-pointer text-white"
          disabled={loading}
          onClick={logoutHandler}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Logout"
          )}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowProfile((prev) => !prev)}
            className="h-13 w-13 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer"
          >
            <img
              src={
                user?.avatar ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="user"
              className="h-full w-full object-cover"
            />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-60 bg-white shadow-xl rounded-xl p-4 z-50">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={
                    user?.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="user"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{user?.username}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
