import { motion } from "framer-motion";

const LoadingSpinner = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-gray-900 flex items-center justify-center flex-col relative overflow-hidden">
			{/* Simple Loading Spinner */}
			<motion.div
				className='w-16 h-16 border-4 border-t-4 border-t-green-500 border-green-200 rounded-full'
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			/>
			<h5>Loading....</h5>
		</div>
	);
};

export default LoadingSpinner;