import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const DeleteAccountPage = () => {
  const { user, deleteProfile } = useAuthStore(); 
	const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/profile");
  }

  const handleDelete = async () => {
    try { 
      await deleteProfile(user.email, user.name); 
      navigate("/"); 
	  toast.success("Account Deleted!");
    } catch (error) { 
      console.log(error); 
	  toast.error("Failed! Try Again Later.")
    }
  }
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
		>
			<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
				Delete Account
			</h2>
			<div className='space-y-6'>
				<motion.div
					className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<h3 className='text-xl font-semibold text-green-400 mb-3'>Profile Information</h3>
					<p className='text-gray-300'>Name: {user.name}</p>
					<p className='text-gray-300'>Email: {user.email}</p>
				</motion.div>
			</div>
      <motion.div
					className='p-4 pb-0'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<h6 className='text-xl font-semibold text-green-400'>Are you Sure about Deleting your Account?</h6>
				</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className='mt-4 flex justify-center items-center'
			>
				
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
					className='w-full py-3 px-4 mr-1 bg-red-700 text-white 
				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
				 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
				>
					Yes, Delete Account
				</motion.button>
        <motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
          onClick={handleCancel}
					className='w-full py-3 px-4 bg-green-700 text-white 
				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
				 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
				>
					No, Cancel Deletion
				</motion.button>
				
			</motion.div>
		</motion.div>
	);
};
export default DeleteAccountPage;