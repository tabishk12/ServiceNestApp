import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaClock, FaRupeeSign, FaStar } from "react-icons/fa";
import {
  useGetBookingsQuery,
  useUpdateStatusMutation,
} from "@slices/Api/booking.Api";
import { useCreateNotificationMutation } from "@slices/Api/notification.Api";
import MetricBar from "./MetricBar";
import HelpSupportCard from "./HelpSupportCard";

const normalizeStatus = (status = "") => status.toLowerCase();

const isSameDay = (dateValue) => {
  if (!dateValue) return false;
  const d = new Date(dateValue);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
};

const ProviderDashboard = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const providerId = userInfo?._id;
  const storageKey = `provider-online-${providerId || "guest"}`;

  const [isOnline, setIsOnline] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved === null ? true : saved === "true";
  });

  const { data: bookings = [] } = useGetBookingsQuery(providerId, {
    skip: !providerId,
  });
  const [updateOrderStatus] = useUpdateStatusMutation();
  const [createNotification] = useCreateNotificationMutation();

  useEffect(() => {
    localStorage.setItem(storageKey, String(isOnline));
  }, [isOnline, storageKey]);

  const todaysJobs = useMemo(
    () =>
      bookings.filter(
        (b) =>
          isSameDay(b.bookingDate || b.createdAt) &&
          ["confirmed", "pending", "completed"].includes(
            normalizeStatus(b.status),
          ),
      ),
    [bookings],
  );

  const todaysSchedule = useMemo(
    () =>
      bookings
        .filter(
          (b) =>
            isSameDay(b.bookingDate || b.createdAt) &&
            normalizeStatus(b.status) === "confirmed",
        )
        .sort(
          (a, b) =>
            new Date(a.bookingDate || a.createdAt) -
            new Date(b.bookingDate || b.createdAt),
        ),
    [bookings],
  );

  const newRequests = useMemo(
    () => bookings.filter((b) => normalizeStatus(b.status) === "pending"),
    [bookings],
  );

  const todaysEarnings = useMemo(
    () =>
      bookings
        .filter(
          (b) =>
            isSameDay(b.bookingDate || b.createdAt) &&
            normalizeStatus(b.status) === "completed",
        )
        .reduce(
          (sum, b) => sum + Number(b.totalPrice || b.totalAmount || 0),
          0,
        ),
    [bookings],
  );

  const avgRating = useMemo(() => {
    const ratings = (userInfo?.spDetails || [])
      .map((d) => Number(d.rating))
      .filter((n) => !Number.isNaN(n) && n > 0);
    if (!ratings.length) return "—";
    const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    return avg.toFixed(1);
  }, [userInfo]);

  const metrics = [
    { label: "Today's Jobs", value: todaysJobs.length },
    { label: "Rating", value: `⭐ ${avgRating}` },
    {
      label: "Today's Earnings",
      value: `₹${todaysEarnings.toFixed(0)}`,
    },
  ];

  const handleStatus = async (booking, orderStatus) => {
    try {
      const updated = await updateOrderStatus({
        bookingId: booking._id,
        orderStatus,
      }).unwrap();
      const customerId =
        updated?.booking?.userId || booking.userId?._id || booking.userId;
      if (customerId) {
        await createNotification({
          userId: customerId,
          title: "Booking Status Updated",
          message: `Your booking status has been updated to ${orderStatus}.`,
          type: "booking",
          bookingId: booking._id,
        });
      }
    } catch (err) {
      console.error("Failed to update booking status", err);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4 px-3 pb-8">
      <MetricBar metrics={metrics} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-10">
        {/* Left 70% */}
        <div className="space-y-4 lg:col-span-7">
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-lg font-bold text-slate-800">
              Today&apos;s Schedule
            </h2>
            {todaysSchedule.length === 0 ? (
              <p className="text-sm text-slate-500">
                No confirmed jobs scheduled for today.
              </p>
            ) : (
              <ol className="relative space-y-4 border-l-2 border-purple-200 pl-5">
                {todaysSchedule.map((job) => (
                  <li key={job._id} className="relative">
                    <span className="absolute -left-[1.66rem] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-[10px] text-white">
                      <FaClock />
                    </span>
                    <div className="rounded-lg border border-slate-100 p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold text-slate-800">
                          {job.serviceId?.name || "Service"}
                        </p>
                        <span className="text-xs font-semibold text-purple-700">
                          {new Date(
                            job.bookingDate || job.createdAt,
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        Customer: {job.userId?.name || "Client"}
                      </p>
                      <Link
                        to={`/booking/${job._id}`}
                        className="mt-2 inline-block text-sm font-semibold text-purple-600 hover:underline"
                      >
                        Open job
                      </Link>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-lg font-bold text-slate-800">
              New Job Requests
            </h2>
            <div className="space-y-3">
              {newRequests.length === 0 && (
                <p className="text-sm text-slate-500">
                  No pending requests at the moment.
                </p>
              )}
              {newRequests.map((req) => (
                <div
                  key={req._id}
                  className="rounded-lg border border-slate-100 p-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-slate-800">
                        {req.serviceId?.name || "Service request"}
                      </p>
                      <p className="text-sm text-slate-500">
                        {req.userId?.name || "Customer"} ·{" "}
                        {new Date(
                          req.bookingDate || req.createdAt,
                        ).toLocaleString()}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-green-700">
                        <FaRupeeSign />
                        {req.totalPrice || req.totalAmount || "—"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleStatus(req, "cancelled")}
                        className="rounded-lg bg-red-500 px-3 py-2 text-sm font-bold text-white hover:bg-red-600"
                      >
                        Decline
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatus(req, "confirmed")}
                        className="rounded-lg bg-green-500 px-3 py-2 text-sm font-bold text-white hover:bg-green-600"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right 30% */}
        <div className="space-y-4 lg:col-span-3">
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-lg font-bold text-slate-800">
              Availability
            </h2>
            <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-3">
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  You are{" "}
                  <span
                    className={isOnline ? "text-green-600" : "text-red-500"}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </p>
                <p className="text-xs text-slate-500">
                  Control incoming job visibility
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isOnline}
                onClick={() => setIsOnline((v) => !v)}
                className={`relative h-8 w-14 rounded-full transition ${
                  isOnline ? "bg-green-500" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
                    isOnline ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          </section>

          <section className="rounded-xl border border-green-100 bg-green-50 p-4 shadow-sm">
            <h2 className="mb-1 text-lg font-bold text-green-900">
              Today&apos;s Earnings
            </h2>
            <p className="flex items-center gap-1 text-3xl font-extrabold text-green-700">
              <FaRupeeSign className="text-2xl" />
              {todaysEarnings.toFixed(0)}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-green-700">
              <FaStar className="text-amber-500" />
              From completed jobs today
            </p>
          </section>

          <HelpSupportCard role="provider" />
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
