import {
  FaStar,
  FaPhoneAlt,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCreditCard,
} from "react-icons/fa";
import ProfileImage from "@assets/Pictures/profile-picture.jpg";
import BackButton from "@utils/BackButton";
import BookingProgress from "./BookingProgress";
import {
  formatCurrency,
  formatSchedule,
  normalizeStatus,
  statusBadgeClass,
} from "./bookingUtils";

const BookingDetailLayout = ({
  serviceName,
  status,
  bookingDate,
  person,
  personLabel = "Service Provider",
  address,
  price,
  paymentMethod,
  actions,
  footer,
}) => {
  const { dateLabel, timeLabel } = formatSchedule(bookingDate);
  const baseFee = Number(price) || 0;
  const tax = 0;
  const total = baseFee + tax;
  const isCod =
    normalizeStatus(paymentMethod) === "cod" || paymentMethod === "COD";
  const rating =
    person?.rating != null && person.rating !== ""
      ? Number(person.rating).toFixed(1)
      : null;

  const addressLine = [
    address?.street,
    address?.city,
    address?.state,
    address?.zipCode,
    address?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4 px-3 py-4 pb-10">
      <BackButton label="Back" />

      <BookingProgress status={status} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-10">
        {/* Left ~65% */}
        <div className="space-y-4 lg:col-span-7">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Service
                </p>
                <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {serviceName}
                </h1>
              </div>
              <span
                className={`rounded-[20px] px-3.5 py-1.5 text-xs font-extrabold tracking-wide ${statusBadgeClass(status)}`}
              >
                {normalizeStatus(status).toUpperCase()}
              </span>
            </div>

            <div className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4 sm:flex-row sm:items-center">
              <img
                src={person?.imageUrl || ProfileImage}
                alt={person?.name || personLabel}
                className="h-20 w-20 shrink-0 rounded-full border-2 border-white object-cover shadow-md"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {personLabel}
                </p>
                <div className="mt-0.5 flex flex-wrap items-center gap-2">
                  <h2 className="truncate text-lg font-bold text-slate-900">
                    {person?.name || "—"}
                  </h2>
                  {rating != null && !Number.isNaN(Number(rating)) && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-sm font-semibold text-amber-700">
                      <FaStar className="text-amber-400" />
                      {rating}
                    </span>
                  )}
                </div>
                {person?.contact && (
                  <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                    <FaPhoneAlt className="text-slate-400" />
                    {person.contact}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="mb-4 text-base font-bold text-slate-800">
              Service & Schedule
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <FaCalendarAlt className="text-purple-500" />
                  Date
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {dateLabel}
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <FaClock className="text-purple-500" />
                  Time
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {timeLabel}
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <FaMapMarkerAlt className="text-purple-500" />
                Delivery Address
              </p>
              <p className="text-sm font-medium leading-relaxed text-slate-700">
                {addressLine || "Address not available"}
              </p>
            </div>
          </section>

          {footer}
        </div>

        {/* Right ~35% */}
        <div className="space-y-4 lg:col-span-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="mb-4 text-base font-bold text-slate-800">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>Service Base Fee</span>
                <span className="font-semibold text-slate-800">
                  {formatCurrency(baseFee)}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Tax / Platform Fee</span>
                <span className="font-semibold text-slate-800">
                  {formatCurrency(tax)}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Amount to Pay
                  </span>
                  <span className="text-lg font-extrabold text-slate-900">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Payment Method
              </p>
              <span
                className={`inline-flex items-center gap-2 rounded-[20px] px-3.5 py-1.5 text-sm font-bold ${
                  isCod
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-sky-50 text-sky-700"
                }`}
              >
                {isCod ? (
                  <>
                    <FaMoneyBillWave />
                    Cash on Delivery
                  </>
                ) : (
                  <>
                    <FaCreditCard />
                    Paid Online
                  </>
                )}
              </span>
            </div>
          </section>

          {actions && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-3 text-base font-bold text-slate-800">
                Actions
              </h3>
              {actions}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailLayout;
