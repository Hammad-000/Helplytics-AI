// import React, { useState } from 'react';
// import API from '../services/api';

// function Login({ onToggle, onLoginSuccess }) {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await API.post('/auth/login', formData);
//       setMessage({ text: '✅ Login successful!', type: 'success' });
//       localStorage.setItem('user', JSON.stringify(response.data));
//       setTimeout(() => onLoginSuccess(response.data), 1000);
//     } catch (error) {
//       setMessage({ 
//         text: '❌ Login failed: ' + (error.response?.data?.message || 'Invalid credentials'), 
//         type: 'error' 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
        
//         {message.text && (
//           <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//             {message.text}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your email"
//             />
//           </div>
          
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your password"
//             />
//           </div>
          
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
        
//         <p className="mt-4 text-center text-sm text-gray-600">
//           Don't have an account?{' '}
//           <button onClick={onToggle} className="text-blue-500 hover:underline">
//             Register
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;