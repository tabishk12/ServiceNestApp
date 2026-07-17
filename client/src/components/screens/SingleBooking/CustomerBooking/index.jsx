import {
  useGetSinleBookingQuery,
  useUpdateStatusMutation,
} from "@slices/Api/booking.Api";
import { useCreateNotificationMutation } from "@slices/Api/notification.Api";
import Loader from "@utils/Loader";
import { FaComments, FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import BookingDetailLayout from "../BookingDetailLayout";
import { chatHref, normalizeStatus } from "../bookingUtils";
import RatingComponent from "./rating";

const CustomerBooking = () => {
  const { bookingId } = useParams();
  const { data: booking, isLoading } = useGetSinleBookingQuery(bookingId, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
    skip: !bookingId,
  });
  const [updateOrderStatus, { isLoading: isCancelling }] =
    useUpdateStatusMutation();
  const [createNotification] = useCreateNotificationMutation();

  if (isLoading) {
    return <Loader text="Loading Data please wait" />;
  }

  if (!booking) {
    return <p className="p-6 text-center text-red-500">Booking not found.</p>;
  }

  const {
    _id: orderId,
    bookingDate,
    status,
    paymentMethod,
    totalPrice,
    serviceId: { name: serviceName, _id: serviceId } = {},
    addressId = {},
    providerId: {
      name,
      imageUrl,
      contact,
      spDetails = [],
      _id: providerId,
    } = {},
  } = booking;

  const detail = spDetails?.find(
    (d) => String(d.serviceId) === String(serviceId),
  );
  const price = totalPrice ?? detail?.price ?? 0;
  const rating = detail?.rating;
  const statusKey = normalizeStatus(status);
  const canCancel = statusKey === "pending" || statusKey === "confirmed";
  const href = chatHref(contact);

  const handleCancel = async () => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      const updated = await updateOrderStatus({
        bookingId: orderId,
        orderStatus: "cancelled",
      }).unwrap();
      const notifyUserId =
        updated?.booking?.providerId?._id ||
        updated?.booking?.providerId ||
        providerId;
      if (notifyUserId) {
        createNotification({
          userId: notifyUserId,
          title: "Booking Cancelled",
          message: `A customer cancelled the booking for ${serviceName}.`,
          type: "booking",
          bookingId: orderId,
        });
      }
    } catch (err) {
      console.error("Failed to cancel booking", err);
      alert(err?.data?.message || "Could not cancel booking.");
    }
  };

  return (
    <BookingDetailLayout
      serviceName={serviceName}
      status={status}
      bookingDate={bookingDate}
      person={{ name, imageUrl, contact, rating }}
      personLabel="Service Provider"
      address={addressId}
      price={price}
      paymentMethod={paymentMethod}
      actions={
        <div className="flex flex-col gap-3">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
            >
              <FaComments />
              Chat with {name?.split(" ")[0] || "Provider"}
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600/50 px-4 py-3 text-sm font-bold text-white"
            >
              <FaComments />
              Chat unavailable
            </button>
          )}
          {canCancel && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={isCancelling}
              className="inline-flex w-full items-center justify-center gap-2 px-2 py-2 text-sm font-semibold text-slate-500 transition hover:text-rose-600 disabled:opacity-50"
            >
              <FaTimes />
              {isCancelling ? "Cancelling..." : "Cancel Booking"}
            </button>
          )}
        </div>
      }
      footer={
        statusKey === "completed" && (
          <RatingComponent
            bookingId={orderId}
            providerId={providerId}
            serviceId={serviceId}
          />
        )
      }
    />
  );
};

export default CustomerBooking;
