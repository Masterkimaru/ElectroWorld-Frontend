import React, { useState } from 'react';
import { FaTimes, FaCalendarAlt, FaClock, FaUser, FaWhatsapp } from 'react-icons/fa';
import './BookingModal.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  deviceInfo: {
    deviceType: string;
    brand: string;
    model: string;
    repairType: string;
    repairs: Array<{
      type: string;
      label: string;
      price: number;
    }>;
    totalCost: number;
  };
}

interface BookingFormData {
  name: string;
  date: string;
  time: string;
}

export default function BookingModal({ isOpen, onClose, deviceInfo }: BookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    date: '',
    time: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  // Repairer's WhatsApp number (replace with actual number)
  const REPAIRER_WHATSAPP = "+254706234072"; // Replace with actual number

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof BookingFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const generateWhatsAppMessage = (): string => {
    const repairsList = deviceInfo.repairs
      .map(repair => `• ${repair.label} - KES ${repair.price.toLocaleString()}`)
      .join('\n');

    return `🔧 *REPAIR BOOKING REQUEST*

👤 *Customer Details:*
Name: ${formData.name}
Date: ${new Date(formData.date).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}
Time: ${formData.time}

📱 *Device Information:*
Type: ${deviceInfo.deviceType.charAt(0).toUpperCase() + deviceInfo.deviceType.slice(1)}
Brand: ${deviceInfo.brand}
Model: ${deviceInfo.model}
Repair Category: ${deviceInfo.repairType}

🛠️ *Repairs Required:*
${repairsList}

💰 *Total Cost: KES ${deviceInfo.totalCost.toLocaleString()}*

Please confirm this appointment. Thank you!`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const message = generateWhatsAppMessage();
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${REPAIRER_WHATSAPP.replace('+', '')}?text=${encodedMessage}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Show success message
      alert('Booking request sent! You will be redirected to WhatsApp to complete the booking.');
      
      // Close modal and reset form
      onClose();
      setFormData({ name: '', date: '', time: '' });
      
    } catch (error) {
      console.error('Error sending booking request:', error);
      alert('Failed to send booking request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Book Repair Appointment</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          {/* Device Summary */}
          <div className="booking-summary">
            <h3>Repair Summary</h3>
            <div className="summary-details">
              <p><strong>{deviceInfo.brand} {deviceInfo.model}</strong></p>
              <p>{deviceInfo.repairs.length} repair(s) - <strong>KES {deviceInfo.totalCost.toLocaleString()}</strong></p>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="name">
                <FaUser className="input-icon" />
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">
                  <FaCalendarAlt className="input-icon" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={today}
                  className={errors.date ? 'error' : ''}
                />
                {errors.date && <span className="error-text">{errors.date}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="time">
                  <FaClock className="input-icon" />
                  Preferred Time *
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={errors.time ? 'error' : ''}
                />
                {errors.time && <span className="error-text">{errors.time}</span>}
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <FaWhatsapp className="btn-icon" />
                    Book via WhatsApp
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="booking-note">
            <p><strong>Note:</strong> Clicking "Book via WhatsApp" will open WhatsApp with your booking details pre-filled. The repairer will confirm your appointment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
