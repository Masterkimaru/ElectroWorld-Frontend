import "./ContactUs.css";
import { FaWhatsapp, FaPhone, FaInstagram, FaTiktok, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <div className="contact-container">
      <motion.header 
        className="contact-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="contact-title">Contact Electro World</h2>
        <p className="contact-subtitle">
          Have questions or need a repair? We're here to help.
        </p>
      </motion.header>

      {/* Contact Info */}
      <section className="contact-info">
        <motion.div 
          className="info-box"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3><FaMapMarkerAlt className="icon" /> Visit Us</h3>
          <p>Electro World, Imenti House shop A10, Nairobi</p>
          <p><FaClock className="icon" /> Mon – Sat: 8:30 AM – 7:00 PM</p>
          <p><FaClock className="icon" /> Sunday: Closed</p>
        </motion.div>

        <motion.div 
          className="info-box"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3><FaPhone className="icon" /> Call / WhatsApp</h3>
          <p>
            <a href="tel:+254706234072" className="contact-link">
              <FaPhone className="icon" /> +254 706 234 072
            </a>
          </p>
          <p>
            <a href="https://wa.me/254706234072" target="_blank" rel="noreferrer" className="contact-link">
              <FaWhatsapp className="icon" /> WhatsApp
            </a>
          </p>
          <h3><FaEnvelope className="icon" /> Email</h3>
          <p>
            <a href="mailto:electroworldke@gmail.com" className="contact-link">
              <FaEnvelope className="icon" /> electroworldke@gmail.com
            </a>
          </p>
        </motion.div>

        <motion.div 
          className="info-box"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3>Follow Us</h3>
          <p>
            <a
              href="https://instagram.com/electroworld_ke"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              <FaInstagram className="icon" /> @electroworld_ke
            </a>
          </p>
          <p>
            <a
              href="https://tiktok.com/@electroworld_ke"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              <FaTiktok className="icon" /> electroworld_ke
            </a>
          </p>
        </motion.div>
      </section>

      {/* Contact Form */}
      <motion.section 
        className="contact-form-section"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3><FaPaperPlane className="icon" /> Send Us a Message</h3>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </form>
      </motion.section>

      {/* Map Section */}
      <motion.section 
        className="map-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3><FaMapMarkerAlt className="icon" /> Find Us</h3>
        <iframe
          title="Electro World Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8180101647395!2d36.8240027!3d-1.283032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f112420581dc7%3A0x26d3d9c67964111e!2sElectro%20World!5e0!3m2!1sen!2ske!4v1755173665504!5m2!1sen!2ske"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: '12px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.section>
    </div>
  );
}