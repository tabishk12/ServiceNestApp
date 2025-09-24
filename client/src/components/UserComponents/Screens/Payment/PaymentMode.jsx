import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBookingMutation } from "@slices/Api/booking.Api";
import { useSelector } from "react-redux";
import {useGetAddressByIdQuery} from "@slices/Api/address.Api";
import { useCreateNotificationMutation } from "@slices/Api/notification.Api";
const PaymentMode = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [CreateBooking,isError,isLoading] = useCreateBookingMutation();
   const [createNotification] = useCreateNotificationMutation();

    const userId = useSelector((state) => state.auth.userInfo?._id);
    const { data: addressData } = useGetAddressByIdQuery(userId);
    const addressId = addressData?.[0]._id;
   
    const bookingDetails = useSelector((state) => state.service.selectedService)||"";
    const {serviceId,price} = bookingDetails.spDetails?.[0] || {};
    const addressDetails = useSelector((state) => state.address.address);
    const{city,country,state:AddressState,street,zipCode} = addressDetails || {};
    
    const TotalAmount =(price * 1.1).toFixed(2);
    const Create_booking ={
        userId: userId,
        ProviderId: bookingDetails._id,
        serviceId:serviceId,
        addressId,
        totalAmount: TotalAmount,
        paymentMethod: paymentMethod,
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("✅ Order placed with payment method:", paymentMethod);
        CreateBooking(Create_booking)
          .unwrap() 
          .then(async (response) => {
            console.log("Order placed successfully:", response);
            
        const bookingId = response._id;

        // 📢 Create notification for Provider
        await createNotification({
          userId: bookingDetails._id, // providerId
          title: "New Booking Received",
          message: "You have received a new service booking.",
          type: "booking",
          bookingId,
        });

        // 📢 Create notification for Customer
        await createNotification({
          userId: userId, // customer
          title: "Booking Created",
          message: "Your service request has been initiated and is pending provider's response.",
          type: "info",
          bookingId,
        });
          })
        navigate("/order-history");
      };

  return (
    <div className="flex flex-col justify-center p-6">
    <div className="w-full mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Choose Payment Method</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}              className="h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">Cash on Delivery (COD)</span>
          </label>

          <label className="flex items-center space-x-3 opacity-50 cursor-not-allowed">
            <input
              type="radio"
              name="paymentMethod"
              value="Card"
              disabled
              className="h-5 w-5"
            />
            <span className="text-gray-700 ">Credit / Debit Card</span>
          </label>

          <label className="flex items-center space-x-3 opacity-50 cursor-not-allowed">
            <input
              type="radio"
              name="paymentMethod"
              value="UPI"
              disabled
              className="h-5 w-5"
            />
            <span className="text-gray-700">UPI / Wallet</span>
          </label>
        </div>
      <div className="flex flex-row gap-6 justify-center">
        <button
          type="button"
          className="bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 transition"
          onClick={() => navigate('/browse-services')}
        >
          Cancle Booking
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition"
        >
          Confirm Booking
        </button>
        </div>
       <p className="flex items-center gap-2 text-sm text-gray-600">
           <FaMapMarkerAlt />
           {street}, {city}, {state}, {zipCode}, {country}
        </p>
     </form>
    </div>
     </div>
  );
};

export default PaymentMode;
