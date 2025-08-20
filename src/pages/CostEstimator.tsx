import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaCheck, FaDownload, FaShare } from 'react-icons/fa';
import { repairPricesData, getRepairTypes, getRepairTypeLabel } from '../data/repairPrices';
import BookingModal from './BookingModal';
import './CostEstimator.css';

interface RepairOption {
  type: string;
  label: string;
  price: number;
  selected: boolean;
}

export default function CostEstimator() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { repairType, deviceType, brand, model } = state || {};
  
  const [repairOptions, setRepairOptions] = useState<RepairOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    // Simulate loading and fetch repair data
    const timer = setTimeout(() => {
      const deviceData = repairPricesData[deviceType];
      const brandData = deviceData?.find(b => b.brand === brand);
      const modelData = brandData?.models.find(m => m.model === model);
      
      if (modelData) {
        const availableRepairs = getRepairTypes(deviceType);
        const options = availableRepairs
          .filter(repairKey => modelData.prices[repairKey as keyof typeof modelData.prices])
          .map(repairKey => ({
            type: repairKey,
            label: getRepairTypeLabel(repairKey),
            price: modelData.prices[repairKey as keyof typeof modelData.prices] || 0,
            selected: repairType === 'hardware' ? 
              ['screenRepair', 'batteryReplacement'].includes(repairKey) :
              repairKey === 'softwareRepair'
          }));
        
        setRepairOptions(options);
      }
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [deviceType, brand, model, repairType]);

  const toggleRepairOption = (type: string) => {
    setRepairOptions(prev => 
      prev.map(option => 
        option.type === type 
          ? { ...option, selected: !option.selected }
          : option
      )
    );
  };

  const selectedOptions = repairOptions.filter(option => option.selected);
  const totalCost = selectedOptions.reduce((sum, option) => sum + option.price, 0);
  const estimatedTime = selectedOptions.length * 2; // 2 hours per repair type
  const warranty = deviceType === 'phone' ? '2 months' : '1 month';

  const goBack = () => {
    navigate(-1);
  };

  const handleBookRepair = () => {
    // Handle booking logic here
    setShowBookingModal(true);
  };
  // Add this function to close the modal
  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
  };

  const generateQuote = () => {
    const quoteData = {
      deviceType,
      brand,
      model,
      repairType,
      repairs: selectedOptions,
      totalCost,
      estimatedTime,
      warranty,
      date: new Date().toLocaleDateString()
    };
    
    console.log('Quote generated:', quoteData);
    alert('Quote downloaded! (In a real app, this would generate a PDF)');
  };

  if (isLoading) {
    return (
      <div className="cost-estimator-container">
        <div className="loading-screen">
          <div className="loading-animation">
            <div className="loading-circle"></div>
            <div className="loading-circle"></div>
            <div className="loading-circle"></div>
          </div>
          <h2>Calculating repair costs...</h2>
          <p>Please wait while we analyze your device</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cost-estimator-container">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
      </div>

      <div className="content-wrapper">
        {/* Header */}
        <div className="header">
          <button className="back-btn" onClick={goBack}>
            <FaArrowLeft />
            <span>Back</span>
          </button>
          
          <div className="header-info">
            <h1 className="main-title">Repair Cost Estimate</h1>
            <div className="device-info">
              <span className="device-detail">{brand}</span>
              <span className="separator">•</span>
              <span className="device-detail">{model}</span>
              <span className="separator">•</span>
              <span className="repair-category">{repairType}</span>
            </div>
          </div>
        </div>

        <div className="estimate-grid">
          {/* Device Summary Card */}
          <div className="summary-card">
            <div className="device-display">
              <div className="device-icon">
                {deviceType === 'phone' && '📱'}
                {deviceType === 'laptop' && '💻'}
                {deviceType === 'tablet' && '📱'}
              </div>
              <div className="device-details">
                <h3>{brand} {model}</h3>
                <p className="device-type">{deviceType.charAt(0).toUpperCase() + deviceType.slice(1)}</p>
                <div className="repair-badges">
                  <span className="repair-badge">{repairType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Repair Options */}
          <div className="repair-options-card">
            <h3 className="section-title">Available Repairs</h3>
            <div className="repair-options-list">
              {repairOptions.map((option, index) => (
                <div
                  key={option.type}
                  className={`repair-option ${option.selected ? 'selected' : ''}`}
                  onClick={() => toggleRepairOption(option.type)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="option-content">
                    <div className="option-info">
                      <h4 className="option-label">{option.label}</h4>
                      <p className="option-description">
                        Professional {option.label.toLowerCase()} service
                      </p>
                    </div>
                    <div className="option-price">
                      <span className="currency">KES</span>
                      <span className="amount">{option.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="option-checkbox">
                    {option.selected && <FaCheck />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="cost-breakdown-card">
            <div className="breakdown-header">
              <h3 className="section-title">Cost Summary</h3>
              <button 
                className="breakdown-toggle"
                onClick={() => setShowBreakdown(!showBreakdown)}
              >
                {showBreakdown ? 'Hide' : 'Show'} Details
              </button>
            </div>

            {showBreakdown && (
              <div className="breakdown-details">
                {selectedOptions.map((option) => (
                  <div key={option.type} className="breakdown-item">
                    <span className="item-name">{option.label}</span>
                    <span className="item-price">KES {option.price.toLocaleString()}</span>
                  </div>
                ))}
                <div className="breakdown-divider"></div>
              </div>
            )}

            <div className="total-section">
              <div className="total-row">
                <span className="total-label">Total Cost</span>
                <span className="total-amount">KES {totalCost.toLocaleString()}</span>
              </div>
              
              <div className="additional-info">
                <div className="info-item">
                  <span className="info-label">Estimated Time:</span>
                  <span className="info-value">{estimatedTime} hours</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Warranty:</span>
                  <span className="info-value">{warranty}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Parts & Labor:</span>
                  <span className="info-value">Included</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="actions-card">
            <h3 className="section-title">Next Steps</h3>
            <div className="actions-grid">
              <button className="action-btn primary" onClick={handleBookRepair}>
                <span className="btn-icon">📅</span>
                <span className="btn-text">Book Repair</span>
                <span className="btn-subtitle">Schedule appointment</span>
              </button>
              
              <button className="action-btn secondary" onClick={generateQuote}>
                <FaDownload className="btn-icon" />
                <span className="btn-text">Get Quote</span>
                <span className="btn-subtitle">Download estimate</span>
              </button>
              
              <button className="action-btn secondary">
                <FaShare className="btn-icon" />
                <span className="btn-text">Share</span>
                <span className="btn-subtitle">Send to others</span>
              </button>
            </div>

            <div className="guarantee-badge">
              <div className="guarantee-icon">✓</div>
              <div className="guarantee-text">
                <strong>Price Match Guarantee</strong>
                <p>We'll match any competitor's price</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BookingModal
      isOpen={showBookingModal}
      onClose={handleCloseBookingModal}
      deviceInfo={{
        deviceType,
        brand,
        model,
        repairType,
        repairs: selectedOptions,
        totalCost
      }}
    />
    </div>
  );
}
