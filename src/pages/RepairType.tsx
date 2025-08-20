import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';

export default function RepairType() {
  const navigate = useNavigate();

  const handleSelect = (type: 'hardware' | 'software') => {
    navigate('/device-type', { state: { repairType: type } });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-deep-blue via-medium-purple to-bright-red p-4 sm:p-6">
      <div className="bg-white dark:bg-charcoal shadow-xl rounded-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md transform transition-all duration-500 hover:scale-105">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="flex items-center text-deep-blue dark:text-light-gray mb-4 hover:underline text-sm sm:text-base"
        >
          <HiArrowLeft className="mr-2 text-lg sm:text-xl" />
          Back
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-center text-charcoal dark:text-white mb-6">
          Select Repair Type
        </h2>

        {/* Buttons */}
        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={() => handleSelect('hardware')}
            className="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-bright-red text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            Hardware
          </button>

          <button
            onClick={() => handleSelect('software')}
            className="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-medium-purple text-white font-semibold rounded-md shadow-md hover:bg-indigo-600 transition duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            Software
          </button>
        </div>
      </div>
    </div>
  );
}
