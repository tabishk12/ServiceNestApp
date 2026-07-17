import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useCreateBookingMutation } from "@slices/Api/booking.Api";
import { useGetAddressByIdQuery } from "@slices/Api/address.Api";
import { useCreateNotificationMutation } from "@slices/Api/notification.Api";

const PaymentMode = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [CreateBooking] = useCreateBookingMutation();
  const [createNotification] = useCreateNotificationMutation();

  const userId = useSelector((state) => state.auth.userInfo?._id);
  const { data: addressData } = useGetAddressByIdQuery(userId, {
    skip: !userId,
  });
  const addressId = addressData?.[0]?._id;

  const bookingDetails =
    useSelector((state) => state.service.selectedService) || {};
  const { serviceId, price } = bookingDetails.spDetails?.[0] || {};
  const addressDetails = useSelector((state) => state.address.address) || {};
  const {
    city = "",
    country = "",
    state: addressState = "",
    street = "",
    zipCode = "",
  } = addressDetails;

  const TotalAmount = ((price || 0) * 1.1).toFixed(2);
  const Create_booking = {
    userId,
    ProviderId: bookingDetails._id,
    serviceId,
    addressId,
    totalAmount: TotalAmount,
    paymentMethod,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateBooking(Create_booking)
      .unwrap()
      .then(async (response) => {
        const bookingId = response._id;

        await createNotification({
          userId: bookingDetails._id,
          title: "New Booking Received",
          message: "You have received a new service booking.",
          type: "booking",
          bookingId,
        });

        await createNotification({
          userId,
          title: "Booking Created",
          message:
            "Your service request has been initiated and is pending provider's response.",
          type: "info",
          bookingId,
        });

        navigate("/order-history");
      })
      .catch((error) => {
        console.error("Failed to place order:", error);
      });
  };

  return (
    <div className="flex flex-col justify-center p-6">
      <div className="mx-auto mt-10 w-full rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Choose Payment Method
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">Cash on Delivery (COD)</span>
            </label>

            <label className="flex cursor-not-allowed items-center space-x-3 opacity-50">
              <input
                type="radio"
                name="paymentMethod"
                value="Card"
                disabled
                className="h-5 w-5"
              />
              <span className="text-gray-700">Credit / Debit Card</span>
            </label>

            <label className="flex cursor-not-allowed items-center space-x-3 opacity-50">
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

          <div className="flex flex-row justify-center gap-6">
            <button
              type="button"
              className="rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-700"
              onClick={() => navigate("/browse-services")}
            >
              Cancel Booking
            </button>
            <button
              type="submit"
              className="rounded-xl bg-green-600 p-3 text-white transition hover:bg-green-700"
            >
              Confirm Booking
            </button>
          </div>

          <p className="flex items-center gap-2 text-sm text-gray-600">
            <FaMapMarkerAlt />
            {[street, city, addressState, zipCode, country]
              .filter(Boolean)
              .join(", ") || "No address selected"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default PaymentMode;
