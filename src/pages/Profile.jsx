import React, { useContext, useEffect } from 'react';
import { MyContext } from '../context/Context';

const Profile = () => {
    useEffect(()=>{
      document.title = "Profile | NoHunger"
    }, [])
    
  const { user } = useContext(MyContext);

  return (
    <div className={`min-h-[70vh] py-10 px-5 dark:bg-gray-800 dark:text-white bg-violet-300 text-black'}`}>
      <div className="max-w-2xl mx-auto bg-violet-100 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
        <div className="p-6 flex flex-col items-center">
          <img
            src={user?.photoURL || 'https://via.placeholder.com/100'}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-violet-500 dark:border-violet-300"
          />
          <h2 className="text-2xl font-semibold mt-4">{user?.fullName || 'Your Name'}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{user?.email || 'you@example.com'}</p>

          <div className="mt-6 w-full text-left">
            <h3 className="text-lg font-medium text-violet-600 dark:text-violet-300 mb-2">Account Info</h3>
            <div className="bg-violet-50 dark:bg-gray-700 p-4 rounded-md">
              <p><span className="font-semibold">Name:</span> {user?.fullName}</p>
              <p><span className="font-semibold">Email:</span> {user?.email}</p>
              <p><span className="font-semibold">User ID:</span> {user?._id || user?.uid || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
