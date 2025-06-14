import React from 'react';
import Home from './Home';
import './Navbar.css';
import About from './About';
import Contact from './Contact';

const Navbar = ({ setCurrentPage }) => {
  return (
    <><nav className="navbar">
          <div className="flex items-center justify-center py-5 ">
              <ul className='text-white flex flex-row gap-1 ietms-center justify-center'>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#contact">Contact</a></li>
              </ul>

          </div>

      </nav><div>
              <Home />
              <About/>
              <Contact/>
          </div></>
  );
};

export default Navbar;
