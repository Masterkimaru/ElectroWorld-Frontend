import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaArrowLeft, FaSearch, FaChevronDown } from 'react-icons/fa';
import { repairPricesData } from '../data/repairPrices';
import './BrandModel.css';

export default function BrandModel() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { repairType, deviceType } = state || {};
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const brands = repairPricesData[deviceType] || [];
  const filteredBrands = brands.filter(brand => 
    brand.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedBrandData = brands.find(brand => brand.brand === selectedBrand);
  const models = selectedBrandData?.models || [];
  const filteredModels = models.filter(model => 
    model.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = async () => {
    if (selectedBrand && selectedModel) {
      setIsLoading(true);
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/cost-estimator', {
        state: { 
          repairType, 
          deviceType, 
          brand: selectedBrand, 
          model: selectedModel 
        }
      });
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const resetSelection = () => {
    setSelectedBrand('');
    setSelectedModel('');
    setSearchTerm('');
  };

  return (
    <div className="brand-model-container">
      {/* Background Animation */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="content-wrapper">
        {/* Header */}
        <div className="header">
          <button className="back-btn" onClick={goBack}>
            <FaArrowLeft />
            <span>Back</span>
          </button>
          
          <div className="header-info">
            <h1 className="main-title">Select Brand & Model</h1>
            <div className="breadcrumb">
              <span className="repair-type">{repairType}</span>
              <span className="separator">•</span>
              <span className="device-type">{deviceType}</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search brands or models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '60%' }}></div>
          </div>
          <span className="progress-text">Step 2 of 3</span>
        </div>

        {/* Selection Cards */}
        <div className="selection-grid">
          {/* Brand Selection */}
          <div className="selection-card">
            <h3 className="card-title">
              <span className="step-number">1</span>
              Choose Brand
            </h3>
            
            <div className="options-container">
              {!selectedBrand ? (
                <div className="brand-grid">
                  {filteredBrands.map((brand, index) => (
                    <div
                      key={brand.brand}
                      className="brand-option"
                      onClick={() => setSelectedBrand(brand.brand)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="brand-logo">
                        {brand.brand.charAt(0)}
                      </div>
                      <span className="brand-name">{brand.brand}</span>
                      <div className="model-count">
                        {brand.models.length} models
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="selected-item">
                  <div className="selected-content">
                    <div className="selected-logo">
                      {selectedBrand.charAt(0)}
                    </div>
                    <div className="selected-info">
                      <h4>{selectedBrand}</h4>
                      <p>{selectedBrandData?.models.length} models available</p>
                    </div>
                  </div>
                  <button className="change-btn" onClick={resetSelection}>
                    Change
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Model Selection */}
          <div className={`selection-card ${!selectedBrand ? 'disabled' : ''}`}>
            <h3 className="card-title">
              <span className="step-number">2</span>
              Choose Model
            </h3>
            
            {selectedBrand ? (
              <div className="options-container">
                {!selectedModel ? (
                  <div className="model-list">
                    {filteredModels.map((model, index) => (
                      <div
                        key={model.model}
                        className="model-option"
                        onClick={() => setSelectedModel(model.model)}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="model-info">
                          <span className="model-name">{model.model}</span>
                          <div className="repair-types">
                            {Object.keys(model.prices).length} repair options
                          </div>
                        </div>
                        <FaChevronDown className="expand-icon" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="selected-item">
                    <div className="selected-content">
                      <div className="selected-info">
                        <h4>{selectedModel}</h4>
                        <p>Ready for cost estimation</p>
                      </div>
                    </div>
                    <button className="change-btn" onClick={() => setSelectedModel('')}>
                      Change
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="placeholder">
                <p>Select a brand first</p>
              </div>
            )}
          </div>
        </div>

        {/* Continue Button */}
        <div className="action-container">
          <button
            className={`continue-btn ${selectedBrand && selectedModel ? 'active' : ''}`}
            onClick={handleContinue}
            disabled={!selectedBrand || !selectedModel || isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              'Get Cost Estimate'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
