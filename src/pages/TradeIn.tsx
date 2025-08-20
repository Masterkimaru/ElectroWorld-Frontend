import React, { useState, useEffect } from 'react';
import './TradeIn.css';

export default function TradeIn() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneModel: '',
    storage: '',
    condition: '',
    screenIssues: '',
    bodyIssues: '',
    batteryHealth: '',
    sellingOption: 'sell', // 'sell' or 'trade'
    desiredPhone: '',
    desiredCashAmount: '',
    additionalCashNeeded: '',
    images: [] as File[],
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const REPAIRER_WHATSAPP = "+254799654737";

  // Animation on mount
  useEffect(() => {
    const container = document.querySelector('.tradein-container');
    if (container) {
      container.classList.add('fade-in');
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, images: filesArray }));

      // Generate previews
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
      
      // Clear image error if images are uploaded
      if (errors.images && filesArray.length >= 4) {
        setErrors((prev) => ({ ...prev, images: '' }));
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    setFormData((prev) => ({ ...prev, images: newImages }));
    setImagePreviews(newPreviews);

    // Add error back if less than 4 images
    if (newImages.length < 4) {
      setErrors((prev) => ({ ...prev, images: 'Please upload at least 4 images of your device.' }));
    }
  };

  // Validate specific step
  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
        break;
      
      case 2:
        if (!formData.phoneModel.trim()) newErrors.phoneModel = 'Current phone model is required.';
        if (!formData.storage) newErrors.storage = 'Storage capacity is required.';
        if (!formData.condition) newErrors.condition = 'Condition is required.';
        if (!formData.screenIssues) newErrors.screenIssues = 'Screen condition is required.';
        if (!formData.bodyIssues) newErrors.bodyIssues = 'Body condition is required.';
        if (!formData.batteryHealth) newErrors.batteryHealth = 'Battery health is required.';
        break;
      
      case 3:
        if (formData.sellingOption === 'sell') {
          if (!formData.desiredCashAmount) newErrors.desiredCashAmount = 'Enter desired cash amount.';
        } else {
          if (!formData.desiredPhone.trim()) newErrors.desiredPhone = 'Specify desired phone model.';
          if (!formData.additionalCashNeeded) newErrors.additionalCashNeeded = 'How much cash you can add?';
        }
        break;
      
      case 4:
        if (formData.images.length < 4) {
          newErrors.images = 'Please upload at least 4 images of your device.';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.phoneModel.trim()) newErrors.phoneModel = 'Current phone model is required.';
    if (!formData.storage) newErrors.storage = 'Storage capacity is required.';
    if (!formData.condition) newErrors.condition = 'Condition is required.';
    if (!formData.screenIssues) newErrors.screenIssues = 'Screen condition is required.';
    if (!formData.bodyIssues) newErrors.bodyIssues = 'Body condition is required.';
    if (!formData.batteryHealth) newErrors.batteryHealth = 'Battery health is required.';

    if (formData.sellingOption === 'sell') {
      if (!formData.desiredCashAmount) newErrors.desiredCashAmount = 'Enter desired cash amount.';
    } else {
      if (!formData.desiredPhone.trim()) newErrors.desiredPhone = 'Specify desired phone model.';
      if (!formData.additionalCashNeeded) newErrors.additionalCashNeeded = 'How much cash you can add?';
    }

    if (formData.images.length < 4) {
      newErrors.images = 'Please upload at least 4 images of your device.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create WhatsApp message
    let message = `📱 *Trade-In / Sell Request* 📱\n\n`;
    message += `👤 *Name:* ${formData.fullName}\n`;
    message += `📱 *Current Phone:* ${formData.phoneModel}\n`;
    message += `💾 *Storage:* ${formData.storage}\n`;
    message += `🔧 *Condition:* ${formData.condition}\n`;
    message += `🖥️ *Screen Issues:* ${formData.screenIssues}\n`;
    message += `📦 *Body Issues:* ${formData.bodyIssues}\n`;
    message += `🔋 *Battery Health:* ${formData.batteryHealth}%\n`;

    if (formData.sellingOption === 'sell') {
      message += `💵 *Selling Option:* Sell for Cash\n`;
      message += `💰 *Desired Amount:* Ksh${formData.desiredCashAmount}\n`;
    } else {
      message += `🔄 *Selling Option:* Trade In\n`;
      message += `🆕 *Desired Phone:* ${formData.desiredPhone}\n`;
      message += `➕ *Additional Cash to Add:* Ksh${formData.additionalCashNeeded}\n`;
    }

    message += `\n📎 *ACTION REQUIRED: Please attach ${formData.images.length} images of your device.*\n`;
    message += `📸 The photos you uploaded (front, back, sides, damage) should be sent in this chat now.\n`;
    message += `\n⚠️ *Note:* Prices are starting points. Final value depends on negotiation with the Engineer.`;

    // Create WhatsApp URL and open it
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = REPAIRER_WHATSAPP.replace(/\+/g, '').replace(/\s/g, '');
    
    // Try different WhatsApp URL formats for better compatibility
    const whatsappUrls = [
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`,
      `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
    ];

    const tryOpenWhatsApp = () => {
      // First try the web version
      const webWhatsApp = window.open(whatsappUrls[0], '_blank');
      
      // If popup was blocked or failed, try alternative methods
      if (!webWhatsApp || webWhatsApp.closed || typeof webWhatsApp.closed == 'undefined') {
        // Try direct link
        window.location.href = whatsappUrls[1];
      }
    };

    setIsSubmitted(true);
    setIsLoading(false);
    
    // Small delay before opening WhatsApp
    setTimeout(() => {
      tryOpenWhatsApp();
    }, 1000);
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
      return; // Don't proceed if validation fails
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Clear errors when going back
      setErrors({});
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Personal Information';
      case 2: return 'Device Details';
      case 3: return 'Trade-In Options';
      case 4: return 'Upload Images';
      default: return '';
    }
  };

  return (
    <div className="tradein-container">
      <div className="tradein-header">
        <h1 className="tradein-title">
          <span className="phone-icon">📱</span>
          Trade In or Sell Your Phone
        </h1>
        <p className="tradein-subtitle">
          Get cash or trade in your current device for a newer model. Fill out the form below and chat directly with our repairer via WhatsApp.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
        <div className="step-indicators">
          {[1, 2, 3, 4].map((step) => (
            <div 
              key={step}
              className={`step-indicator ${currentStep >= step ? 'active' : ''}`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      <div className="step-title">
        <h2>{getStepTitle(currentStep)}</h2>
      </div>

      <form onSubmit={handleSubmit} className="tradein-form">
        
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="form-step active">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">👤</span>
                Full Name *
              </label>
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>
          </div>
        )}

        {/* Step 2: Device Details */}
        {currentStep === 2 && (
          <div className="form-step active">
            <div className="device-section">
              <h3 className="section-title">
                <span className="section-icon">📱</span>
                Your Current Phone Details
              </h3>

              <div className="form-group">
                <label className="form-label">Phone Model *</label>
                <input 
                  type="text" 
                  name="phoneModel" 
                  value={formData.phoneModel} 
                  onChange={handleChange} 
                  className={`form-input ${errors.phoneModel ? 'error' : ''}`}
                  placeholder="e.g., iPhone 13, Samsung Galaxy S22"
                />
                {errors.phoneModel && <span className="error-message">{errors.phoneModel}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Storage Capacity *</label>
                  <select 
                    name="storage" 
                    value={formData.storage} 
                    onChange={handleChange} 
                    className={`form-select ${errors.storage ? 'error' : ''}`}
                  >
                    <option value="">Select storage</option>
                    <option value="64GB">64GB</option>
                    <option value="128GB">128GB</option>
                    <option value="256GB">256GB</option>
                    <option value="512GB">512GB</option>
                    <option value="1TB">1TB</option>
                  </select>
                  {errors.storage && <span className="error-message">{errors.storage}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Battery Health (%) *</label>
                  <input
                    type="number"
                    name="batteryHealth"
                    value={formData.batteryHealth}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className={`form-input ${errors.batteryHealth ? 'error' : ''}`}
                    placeholder="e.g., 85"
                  />
                  {errors.batteryHealth && <span className="error-message">{errors.batteryHealth}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Overall Condition *</label>
                <select 
                  name="condition" 
                  value={formData.condition} 
                  onChange={handleChange} 
                  className={`form-select ${errors.condition ? 'error' : ''}`}
                >
                  <option value="">Select condition</option>
                  <option value="Like New">Like New (No scratches, works perfectly)</option>
                  <option value="Good">Good (Minor scratches, fully functional)</option>
                  <option value="Fair">Fair (Visible wear, some issues)</option>
                  <option value="Poor">Poor (Cracks, malfunctions, etc.)</option>
                </select>
                {errors.condition && <span className="error-message">{errors.condition}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Screen Condition *</label>
                  <select 
                    name="screenIssues" 
                    value={formData.screenIssues} 
                    onChange={handleChange} 
                    className={`form-select ${errors.screenIssues ? 'error' : ''}`}
                  >
                    <option value="">Select screen status</option>
                    <option value="No issues">No issues</option>
                    <option value="Scratches">Scratches</option>
                    <option value="Cracked">Cracked</option>
                    <option value="Discoloration">Discoloration</option>
                    <option value="Unresponsive">Unresponsive</option>
                  </select>
                  {errors.screenIssues && <span className="error-message">{errors.screenIssues}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Body Condition *</label>
                  <select 
                    name="bodyIssues" 
                    value={formData.bodyIssues} 
                    onChange={handleChange} 
                    className={`form-select ${errors.bodyIssues ? 'error' : ''}`}
                  >
                    <option value="">Select body status</option>
                    <option value="No issues">No issues</option>
                    <option value="Minor scratches">Minor scratches</option>
                    <option value="Dents or deep scratches">Dents or deep scratches</option>
                    <option value="Back glass broken">Back glass broken</option>
                  </select>
                  {errors.bodyIssues && <span className="error-message">{errors.bodyIssues}</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Trade-In Options */}
        {currentStep === 3 && (
          <div className="form-step active">
            <div className="options-section">
              <h3 className="section-title">
                <span className="section-icon">🔄</span>
                Choose Your Option
              </h3>

              <div className="radio-group">
                <label className={`radio-card ${formData.sellingOption === 'sell' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="sellingOption"
                    value="sell"
                    checked={formData.sellingOption === 'sell'}
                    onChange={() => setFormData((prev) => ({ ...prev, sellingOption: 'sell' }))}
                  />
                  <div className="radio-content">
                    <span className="radio-icon">💵</span>
                    <div>
                      <h4>Sell for Cash</h4>
                      <p>Get immediate cash for your device</p>
                    </div>
                  </div>
                </label>

                <label className={`radio-card ${formData.sellingOption === 'trade' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="sellingOption"
                    value="trade"
                    checked={formData.sellingOption === 'trade'}
                    onChange={() => setFormData((prev) => ({ ...prev, sellingOption: 'trade' }))}
                  />
                  <div className="radio-content">
                    <span className="radio-icon">🔄</span>
                    <div>
                      <h4>Trade In</h4>
                      <p>Trade for a newer phone model</p>
                    </div>
                  </div>
                </label>
              </div>

              {formData.sellingOption === 'sell' && (
                <div className="conditional-fields slide-in">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">💰</span>
                      Desired Cash Amount (Ksh) *
                    </label>
                    <input
                      type="number"
                      name="desiredCashAmount"
                      value={formData.desiredCashAmount}
                      onChange={handleChange}
                      min="1"
                      className={`form-input ${errors.desiredCashAmount ? 'error' : ''}`}
                      placeholder="Enter amount"
                    />
                    {errors.desiredCashAmount && <span className="error-message">{errors.desiredCashAmount}</span>}
                  </div>
                </div>
              )}

              {formData.sellingOption === 'trade' && (
                <div className="conditional-fields slide-in">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">🆕</span>
                      Desired Phone Model *
                    </label>
                    <input
                      type="text"
                      name="desiredPhone"
                      value={formData.desiredPhone}
                      onChange={handleChange}
                      className={`form-input ${errors.desiredPhone ? 'error' : ''}`}
                      placeholder="e.g., iPhone 15, Pixel 8"
                    />
                    {errors.desiredPhone && <span className="error-message">{errors.desiredPhone}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">➕</span>
                      How Much Cash Can You Add? (Ksh) *
                    </label>
                    <input
                      type="number"
                      name="additionalCashNeeded"
                      value={formData.additionalCashNeeded}
                      onChange={handleChange}
                      min="0"
                      className={`form-input ${errors.additionalCashNeeded ? 'error' : ''}`}
                      placeholder="Enter amount"
                    />
                    {errors.additionalCashNeeded && <span className="error-message">{errors.additionalCashNeeded}</span>}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Upload Images */}
        {currentStep === 4 && (
          <div className="form-step active">
            <div className="upload-section">
              <h3 className="section-title">
                <span className="section-icon">📷</span>
                Upload Device Images
              </h3>
              <p className="upload-description">
                Upload at least 4 clear images (front, back, sides, any damage).
              </p>

              <div className="upload-area">
                <input 
                  type="file" 
                  id="image-upload"
                  accept="image/*" 
                  multiple 
                  onChange={handleImageChange}
                  className="upload-input"
                />
                <label htmlFor="image-upload" className="upload-label">
                  <div className="upload-content">
                    <span className="upload-icon">📁</span>
                    <p>Click to upload images or drag and drop</p>
                    <small>PNG, JPG, JPEG up to 10MB each</small>
                  </div>
                </label>
              </div>

              {errors.images && <span className="error-message">{errors.images}</span>}

              {imagePreviews.length > 0 && (
                <div className="image-previews">
                  <h4>Image Previews ({imagePreviews.length})</h4>
                  <div className="preview-grid">
                    {imagePreviews.map((src, index) => (
                      <div key={index} className="preview-item">
                        <img
                          src={src}
                          alt={`Preview ${index + 1}`}
                          className="preview-image"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="remove-image"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="form-navigation">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="btn btn-secondary"
            >
              ← Previous
            </button>
          )}
          
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn btn-primary"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              className={`btn btn-whatsapp ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                <>
                  <span className="whatsapp-icon">📱</span>
                  Send Request via WhatsApp
                </>
              )}
            </button>
          )}
        </div>

        {/* Disclaimer */}
        <div className="disclaimer">
          <p>
            ⚠️ <strong>Note:</strong> The prices you enter are not guaranteed. The final amount or trade-in value depends on the condition of your device and your negotiation with the Engineer.
          </p>
        </div>

        {isSubmitted && (
          <div className="success-message slide-in">
            <span className="success-icon">✅</span>
            <p>Request prepared successfully! Opening WhatsApp...</p>
            <p><small>If WhatsApp doesn't open automatically, please copy the message and send it manually to {REPAIRER_WHATSAPP}</small></p>
          </div>
        )}
      </form>
    </div>
  );
}
