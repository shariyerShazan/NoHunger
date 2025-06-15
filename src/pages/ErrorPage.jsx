import React, { useEffect } from 'react';
import { Link } from 'react-router';

function ErrorPage() {
    useEffect(()=>{
      document.title = "Error | NoHunger"
    }, [])
    
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-violet-100 dark:bg-gray-900 text-center px-4">
      <h1 className="text-7xl font-extrabold text-violet-600 dark:text-white mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-violet-600 text-white px-6 py-2 rounded-full hover:bg-violet-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default ErrorPage;
