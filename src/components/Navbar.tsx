import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaTools,
  FaShoppingBag,
  FaExchangeAlt,
  FaInfoCircle,
  FaPhoneAlt
} from 'react-icons/fa';
import './Navbar.css';

const links = [
  { to: '/', label: 'Repair', icon: <FaTools /> },
  { to: '/shop', label: 'Shop', icon: <FaShoppingBag /> },
  { to: '/trade-in', label: 'Trade In', icon: <FaExchangeAlt /> },
  { to: '/about', label: 'About', icon: <FaInfoCircle /> },
  { to: '/contact', label: 'Contact', icon: <FaPhoneAlt /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <motion.img
            src="/logo.png" // make sure this path is correct
            alt="Electro World Logo"
            className="logo-img"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />

          {isMobile && (
            <motion.button
              className={`hamburger ${isOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              aria-label="Menu"
              whileTap={{ scale: 0.9 }}
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </motion.button>
          )}
        </div>

        {!isMobile && (
          <div className="nav-links">
            {links.map((link) => (
              <motion.div
                key={link.to}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-icon">{link.icon}</span>
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </div>
        )}

        {isMobile && (
          <motion.div
            className={`mobile-nav ${isOpen ? 'open' : ''}`}
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            variants={{
              open: { maxHeight: '500px' },
              closed: { maxHeight: '0px' }
            }}
            transition={{ duration: 0.5 }}
          >
            {links.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -20 }}
                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1, type: 'spring' }}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="nav-icon">{link.icon}</span>
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
