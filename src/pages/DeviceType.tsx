import { useNavigate, useLocation } from 'react-router-dom';
import { FaMobileAlt, FaLaptop, FaTabletAlt, FaArrowLeft } from 'react-icons/fa'; // Added FaArrowLeft
import './DeviceType.css';

export default function DeviceType() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const repairType = state?.repairType;

  const handleDevice = (device: string) => {
    navigate('/brand-model', {
      state: { repairType, deviceType: device }
    });
  };

  // Function to handle going back
  const goBack = () => {
    navigate(-1); // This will go back to the previous page in history
  };

  const devices = [
    {
      id: 'phone',
      name: 'Phone',
      icon: <FaMobileAlt />,
      description: 'Smartphones & Mobile Devices',
      color: '#4F46E5'
    },
    {
      id: 'laptop',
      name: 'Laptop/PC',
      icon: <FaLaptop />,
      description: 'Laptops & Desktop Computers',
      color: '#059669'
    },
    {
      id: 'tablet',
      name: 'Tablet/iPad',
      icon: <FaTabletAlt />,
      description: 'Tablets & iPads',
      color: '#DC2626'
    }
  ];

  return (
    <div className="device-type-container">
      <button className="back-button" onClick={goBack}>
        <FaArrowLeft />
      </button>
      <h2 className="title">Select Device Type</h2>
      <div className="devices-grid">
        {devices.map((device) => (
          <div 
            key={device.id}
            className="device-card"
            onClick={() => handleDevice(device.id)}
            style={{ '--device-color': device.color } as React.CSSProperties}
          >
            <div className="device-icon">
              {device.icon}
            </div>
            <div className="device-info">
              <h3>{device.name}</h3>
              <p>{device.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}