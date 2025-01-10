import { React, useState } from "react";
import { motion } from "framer-motion";
import { ScanFace, User, Loader } from "lucide-react";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import DefaultAvatar from '../../../public/DefaultAvatar.jpg';
import toast from 'react-hot-toast'

const EditProfilePage = () => {
  const { editProfile, user, error, isLoading } = useAuthStore();
  const [profile, setProfile] = useState(null); 

  const [profilePreview, setProfilePreview] = useState(user.profile ? user.profile : DefaultAvatar);
  const [name, setName] = useState(user.name);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await editProfile(user.email, name, profile);
      toast.success("Information Updated!");
      navigate("/profile"); 
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to Update!");
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit}>
          <img
            src={profilePreview}
            alt="Profile Picture"
            className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-green-500 transition-transform duration-300 hover:border-green-500"
          />
          <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Picture</label>
          <div className="mb-6 relative">
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <ScanFace className='size-5 text-green-500' />
            </div>
            <input 
              id="picture" 
              type="file" 
              name="profile"
              accept="image/*" 
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200" 
              onChange={handleImageChange} 
            />
          </div>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

          <motion.button
            disabled={isLoading}
            className={`mt-5 w-full py-3 px-4 font-bold rounded-lg shadow-lg transition duration-200 ${
              isLoading 
                ? "bg-gray-500 cursor-not-allowed" 
                : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              "Update"
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default EditProfilePage;
