import {FaRupeeSign } from 'react-icons/fa';
import { useSelector } from "react-redux";

const TotalPayment = () => {
  const { selectedService} = useSelector((state) => state.service);

  // Guard against undefined
  const price = selectedService.spDetails && selectedService.spDetails.length > 0 ? selectedService.spDetails[0].price : 0;

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Total Payment</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-bold">Service Price:</span>
            <p className="flex items-center gap-2 text-sm text-green-600 font-medium"><FaRupeeSign/>{price.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-bold">Tax:</span>
            <p className="flex items-center gap-2 text-sm text-gray-800 font-medium"><FaRupeeSign/>{(price * 0.1).toFixed(2)}</p>
          </div>
          <div className="border-t border-gray-300 my-2"></div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-bold">Total Payment:</span>
            <p className="flex items-center gap-2 text-sm text-gray-900 font-medium"><FaRupeeSign/>{(price * 1.1).toFixed(2)}</p>
          </div>
      </div>
    </div>
  );
};

export default TotalPayment;
