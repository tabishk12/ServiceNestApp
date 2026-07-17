import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";

const TotalPayment = () => {
  const selectedService = useSelector((state) => state.service.selectedService);
  const price = selectedService?.spDetails?.[0]?.price || 0;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold">Total Payment</h2>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-bold text-gray-600">Service Price:</span>
          <p className="flex items-center gap-2 text-sm font-medium text-green-600">
            <FaRupeeSign />
            {Number(price).toFixed(2)}
          </p>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-bold text-gray-600">Tax:</span>
          <p className="flex items-center gap-2 text-sm font-medium text-gray-800">
            <FaRupeeSign />
            {(Number(price) * 0.1).toFixed(2)}
          </p>
        </div>
        <div className="my-2 border-t border-gray-300"></div>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-bold text-gray-600">Total Payment:</span>
          <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
            <FaRupeeSign />
            {(Number(price) * 1.1).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalPayment;
