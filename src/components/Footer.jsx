import React from 'react';
import { Link } from 'react-router';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-violet-400 dark:bg-gray-900 dark:text-white py-8">
     <div className='w-[90%] mx-auto'>
     <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        <div>
          <h2 className="text-2xl font-bold mb-2">NoHunger</h2>
          <p className="text-sm">A platform to fight hunger and spread kindness. Join us in making a difference.</p>
        </div>

        <div>
  <h3 className="font-semibold mb-2">Quick Links</h3>
  <ul className="space-y-1">
    <li>
      <Link
        to="/"
        className=" inline-block transition-all duration-500 hover:translate-x-2"
      >
        Home
      </Link>
    </li>
    <li>
      <Link
        to="/about"
        className=" inline-block transition-all duration-500 hover:translate-x-2"
      >
        About Us
      </Link>
    </li>
    <li>
      <Link
        to="/profile"
        className=" inline-block transition-all duration-500 hover:translate-x-2"
      >
        Profile
      </Link>
    </li>
  </ul>
</div>


        <div>
          <h3 className="font-semibold mb-2">Contact Info</h3>
          <p>Email: <a href="mailto:help@nohunger.org" className="hover:underline">xxxxx@NoHunger.org</a></p>
          <p>Phone: +123-456-7xxx</p>
          <p>Location: Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-100 dark:text-gray-400">
        &copy; {year} NoHunger. All rights reserved.
      </div>
     </div>
    </footer>
  );
}

export default Footer;
