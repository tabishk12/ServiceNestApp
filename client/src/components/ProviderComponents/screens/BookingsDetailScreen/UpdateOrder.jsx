import { useUpdateStatusMutation } from "@slices/Api/booking.Api";
import { useState } from "react";
import { useCreateNotificationMutation } from "@slices/Api/notification.Api";
import { FaCheck, FaTimes } from "react-icons/fa";

const normalizeStatus = (status = "") => status.toLowerCase();

const UpdateOrder = ({ status, bookingId }) => {
  const [createNotification] = useCreateNotificationMutation();
  const [orderStatus, setStatus] = useState(status);
  const [updateOrderStatus, { isLoading }] = useUpdateStatusMutation();
  const statusKey = normalizeStatus(orderStatus);

  const updateStatus = async (newStatus) => {
    setStatus(newStatus);
    try {
      const updatedBooking = await updateOrderStatus({
        bookingId,
        orderStatus: newStatus,
      }).unwrap();
      createNotification({
        userId: updatedBooking.booking.userId,
        title: "Booking Status Updated",
        message: `Your booking status has been updated to ${newStatus}.`,
        type: "booking",
        bookingId,
      });
    } catch (err) {
      setStatus(status);
      console.error(err);
    }
  };

  if (statusKey === "pending") {
    return (
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={isLoading}
          className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
          onClick={() => updateStatus("confirmed")}
        >
          <FaCheck /> Accept
        </button>
        <button
          type="button"
          disabled={isLoading}
          className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:bg-rose-700 disabled:opacity-50"
          onClick={() => updateStatus("cancelled")}
        >
          <FaTimes /> Decline
        </button>
      </div>
    );
  }

  if (statusKey === "confirmed") {
    return (
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={isLoading}
          className="inline-flex items-center gap-1 rounded-xl bg-purple-600 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700 disabled:opacity-50"
          onClick={() => updateStatus("completed")}
        >
          <FaCheck /> Complete
        </button>
        <button
          type="button"
          disabled={isLoading}
          className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700 hover:bg-rose-100 disabled:opacity-50"
          onClick={() => updateStatus("cancelled")}
        >
          <FaTimes /> Cancel
        </button>
      </div>
    );
  }

  return null;
};

export default UpdateOrder;
