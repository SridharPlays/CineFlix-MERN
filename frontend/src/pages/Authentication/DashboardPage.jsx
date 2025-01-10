import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { formatDate } from "../../utils/date";
import { useNavigate } from "react-router-dom";
import DefaultAvatar from "../../../public/DefaultAvatar.jpg";
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const { user, logout, fetchUser, forgotPassword } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  const handleDelete = () => {
    navigate("/delete-account");
  };

  const handleUpdatePassword = () => {
    forgotPassword(user.email);
    toast.success("Password Reset Link Sent!");
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full mx-auto p-8 h-screen bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-2xl border border-gray-800"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
        User Dashboard
      </h2>
      <div className="flex">
        <div className="flex items-start justify-center flex-col mr-2 w-full">
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 mb-2 rounded-lg border border-gray-700 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-green-400 mb-3 w-full">
              Profile Information
            </h3>
            <p className="text-gray-300">Name: {user.name}</p>
            <p className="text-gray-300">Email: {user.email}</p>
          </motion.div>

          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 mb-2 rounded-lg border border-gray-700 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-green-400 mb-3 w-full">
              Booking Information
            </h3>
            <p className="text-gray-300">Empty!</p>
          </motion.div>

          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 mb-2 rounded-lg border border-gray-700 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-green-400 mb-3 min-w-max">
              Payment Information
            </h3>
            <p className="text-gray-300">No Card Added!</p>
          </motion.div>

          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-green-400 mb-3">
              Account Activity
            </h3>
            <p className="text-gray-300">
              <span className="font-bold">Joined: </span>
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-300">
              <span className="font-bold">Last Login: </span>
              {formatDate(user.lastLogin)}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="p-4 mt-0 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-center text-green-400 mb-3">
            Profile Avatar
          </h3>
          <img
            src={
              user && user.profile
                ? user.profile
                : DefaultAvatar
            }
            alt="Profile Picture"
            className="rounded-full w-96 mb-4 border-4 border-green-500 transition-transform duration-300 hover:border-green-500"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4 flex justify-center items-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEdit}
          className="w-full py-3 px-4 mr-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
        font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Update Info
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpdatePassword}
          className="w-full py-3 px-4 mr-3 bg-yellow-500 text-white 
        font-bold rounded-lg shadow-lg hover:bg-yellow-600
        focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Update Password
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
          className="w-full py-3 px-4 mr-3 bg-red-700 text-white 
        font-bold rounded-lg shadow-lg hover:bg-red-800
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Delete Account
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full py-3 px-4 bg-rose-800 text-white 
        font-bold rounded-lg shadow-lg hover:bg-rose-900
        focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
export default DashboardPage;
