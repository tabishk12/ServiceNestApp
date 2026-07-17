import {
  useGetSinleBookingQuery,
  useUpdateStatusMutation,
} from "@slices/Api/booking.Api";
import { useCreateNotificationMutation } from "@slices/Api/notification.Api";
import Loader from "@utils/Loader";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import BookingDetailLayout from "../BookingDetailLayout";
import { normalizeStatus } from "../bookingUtils";

const ProviderBooking = () => {
  const { bookingId } = useParams();
  const { data: booking, isLoading } = useGetSinleBookingQuery(bookingId, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
    skip: !bookingId,
  });
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateStatusMutation();
  const [createNotification] = useCreateNotificationMutation();
  const [localStatus, setLocalStatus] = useState(null);

  const serverStatus = booking?.status;
  useEffect(() => {
    setLocalStatus(null);
  }, [serverStatus]);

  if (isLoading) {
    return <Loader text="Loading Data please wait" />;
  }

  if (!booking) {
    return <p className="p-6 text-center text-red-500">Booking not found.</p>;
  }

  const {
    _id: orderId,
    bookingDate,
    paymentMethod,
    totalPrice,
    serviceId: { name: serviceName, _id: serviceId } = {},
    addressId = {},
    userId: { name, imageUrl, contact, _id: customerId } = {},
    providerId: { spDetails = [] } = {},
  } = booking;

  const status = localStatus || serverStatus;
  const detail = spDetails?.find(
    (d) => String(d.serviceId) === String(serviceId),
  );
  const price = totalPrice ?? detail?.price ?? 0;
  const statusKey = normalizeStatus(status);

  const updateStatus = async (newStatus) => {
    try {
      setLocalStatus(newStatus);
      const updated = await updateOrderStatus({
        bookingId: orderId,
        orderStatus: newStatus,
      }).unwrap();
      const notifyUserId =
        updated?.booking?.userId?._id || updated?.booking?.userId || customerId;
      if (notifyUserId) {
        createNotification({
          userId: notifyUserId,
          title: "Booking Status Updated",
          message: `Your booking status has been updated to ${newStatus}.`,
          type: "booking",
          bookingId: orderId,
        });
      }
    } catch (err) {
      setLocalStatus(null);
      console.error("Failed to update booking status", err);
      alert(err?.data?.message || "Could not update booking.");
    }
  };

  const actions =
    statusKey === "pending" ? (
      <div className="flex flex-col gap-3">
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => updateStatus("confirmed")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
        >
          <FaCheck />
          Accept Booking
        </button>
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => updateStatus("cancelled")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700 transition hover:bg-rose-100 disabled:opacity-50"
        >
          <FaTimes />
          Decline
        </button>
      </div>
    ) : statusKey === "confirmed" ? (
      <div className="flex flex-col gap-3">
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => updateStatus("completed")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-purple-700 disabled:opacity-50"
        >
          <FaCheck />
          Mark Completed
        </button>
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => updateStatus("cancelled")}
          className="inline-flex w-full items-center justify-center gap-2 px-2 py-2 text-sm font-semibold text-slate-500 transition hover:text-rose-600 disabled:opacity-50"
        >
          <FaTimes />
          Cancel Booking
        </button>
      </div>
    ) : (
      <p className="text-sm text-slate-500">
        No further actions for this booking.
      </p>
    );

  return (
    <BookingDetailLayout
      serviceName={serviceName}
      status={status}
      bookingDate={bookingDate}
      person={{ name, imageUrl, contact }}
      personLabel="Customer"
      address={addressId}
      price={price}
      paymentMethod={paymentMethod}
      actions={actions}
    />
  );
};

export default ProviderBooking;
