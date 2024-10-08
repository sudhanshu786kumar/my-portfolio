import React from 'react';
import { Link } from 'react-scroll';
import { FaHome, FaBriefcase, FaCog, FaProjectDiagram, FaGraduationCap, FaEnvelope } from 'react-icons/fa';

const Header = ({ darkMode, setCurrentSection }) => {
  const navItems = [
    { id: 'home', icon: FaHome, label: 'Home' },
    { id: 'experience', icon: FaBriefcase, label: 'Experience' },
    { id: 'skills', icon: FaCog, label: 'Skills' },
    { id: 'projects', icon: FaProjectDiagram, label: 'Projects' },
    { id: 'education', icon: FaGraduationCap, label: 'Education' },
    { id: 'contact', icon: FaEnvelope, label: 'Contact' },
  ];

  return (
    <header className={`fixed md:sticky md:top-0 bottom-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <nav className="container mx-auto px-2 py-2 md:px-6 md:py-3">
        <ul className="flex justify-around md:justify-center md:space-x-6">
          {navItems.map(({ id, icon: Icon, label }) => (
            <li key={id}>
              <Link
                to={id}
                smooth={true}
                duration={500}
                offset={-70}
                className={`cursor-pointer flex flex-col items-center ${
                  darkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'
                } transition duration-300`}
                onClick={() => setCurrentSection(id)}
              >
                <Icon className="text-xl mb-1" />
                <span className="text-xs hidden md:inline">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;