import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBookingHistoryQuery } from "@slices/Api/booking.Api";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRupeeSign,
  FaSearch,
  FaFilter,
  FaArrowRight,
} from "react-icons/fa";
import FilterDropdown from "@components/Utils/FilterDropdown";
import {
  formatCurrency,
  normalizeStatus,
  statusBadgeClass,
} from "@components/screens/SingleBooking/bookingUtils";

const STATUS_OPTIONS = [
  { value: "", label: "All statuses", shortLabel: "Status" },
  { value: "pending", label: "Pending", shortLabel: "Pending" },
  { value: "confirmed", label: "Confirmed", shortLabel: "Confirmed" },
  { value: "completed", label: "Completed", shortLabel: "Completed" },
  { value: "cancelled", label: "Cancelled", shortLabel: "Cancelled" },
];

const Orders = ({ userId }) => {
  const navigate = useNavigate();
  const {
    data: bookingHistory = [],
    isLoading,
    isError,
  } = useGetBookingHistoryQuery(userId);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [openFilter, setOpenFilter] = useState(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current?.contains(event.target)) return;
      setOpenFilter(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    const statusKey = normalizeStatus(statusFilter);

    return (bookingHistory || []).filter((order) => {
      const orderStatus = normalizeStatus(order.status);
      if (statusKey && orderStatus !== statusKey) return false;
      if (!q) return true;

      const provider = order.providerId?.name?.toLowerCase() || "";
      const service = order.serviceId?.name?.toLowerCase() || "";
      const contact = order.providerId?.contact?.toLowerCase() || "";
      const city = order.addressId?.city?.toLowerCase() || "";
      const street = order.addressId?.street?.toLowerCase() || "";
      const payment = (order.paymentMethod || "").toLowerCase();

      return (
        provider.includes(q) ||
        service.includes(q) ||
        contact.includes(q) ||
        city.includes(q) ||
        street.includes(q) ||
        payment.includes(q) ||
        orderStatus.includes(q)
      );
    });
  }, [bookingHistory, search, statusFilter]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setOpenFilter(null);
  };

  if (isError) {
    return (
      <div className="mt-4 text-center text-lg text-red-600">
        Failed to fetch order history.
      </div>
    );
  }

  if (isLoading) return null;

  return (
    <div className="mx-auto w-full max-w-7xl px-3 pb-10 pt-4 text-left">
      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Booking History</h1>
          <p className="text-sm text-slate-500">
            {filteredOrders.length} of {bookingHistory.length} booking
            {bookingHistory.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1 sm:min-w-72">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search service, provider, city..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-sm font-medium text-slate-800 outline-none ring-purple-500 focus:bg-white focus:ring-2"
            />
          </div>

          <FilterDropdown
            label="Status"
            icon={<FaFilter className="text-purple-500" />}
            value={statusFilter}
            options={STATUS_OPTIONS}
            onChange={setStatusFilter}
            open={openFilter === "status"}
            onToggle={() =>
              setOpenFilter((prev) => (prev === "status" ? null : "status"))
            }
            menuRef={statusRef}
          />

          {(search || statusFilter) && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl px-3 py-2.5 text-sm font-semibold text-purple-600 hover:bg-purple-50"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
          <p className="text-lg font-semibold text-slate-700">
            No bookings match your filters
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Try a different search or status.
          </p>
          {(search || statusFilter) && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 rounded-xl bg-purple-600 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredOrders.map((order) => {
            const {
              _id: orderId,
              bookingDate,
              status,
              paymentMethod,
              totalPrice,
              providerId: { name, imageUrl, contact, spDetails = [] } = {},
              addressId: { street, city, state, zipCode, country } = {},
              serviceId: { name: serviceName, _id: serviceId } = {},
            } = order;

            const detail = spDetails.find(
              (d) => String(d.serviceId) === String(serviceId),
            );
            const price = totalPrice ?? detail?.price ?? 0;

            return (
              <button
                key={orderId}
                type="button"
                onClick={() => navigate(`/booking/${orderId}`)}
                className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-purple-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="h-24 w-24 rounded-full border-4 border-slate-200 object-cover shadow-sm"
                  />

                  <div className="min-w-0 flex-1 space-y-2 text-slate-700">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-lg font-semibold text-slate-900">
                        {name}
                      </h2>
                      <span
                        className={`shrink-0 rounded-[20px] px-3 py-1 text-xs font-extrabold tracking-wide ${statusBadgeClass(status)}`}
                      >
                        {normalizeStatus(status).toUpperCase()}
                      </span>
                    </div>

                    <p className="flex items-center gap-2 text-sm">
                      <FaPhoneAlt className="text-slate-400" />
                      {contact}
                    </p>

                    <p className="text-sm">
                      <span className="font-semibold text-slate-800">
                        Service:{" "}
                      </span>
                      {serviceName}
                    </p>

                    <p className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                      <FaRupeeSign className="text-emerald-500" />
                      {formatCurrency(price).replace("₹", "")}
                    </p>

                    <p className="flex items-center gap-2 text-sm text-slate-600">
                      <FaCalendarAlt className="text-slate-400" />
                      {new Date(bookingDate).toLocaleString()}
                    </p>

                    <p className="text-sm font-medium text-emerald-600">
                      {paymentMethod === "COD"
                        ? "Cash on Delivery"
                        : paymentMethod}
                    </p>

                    <p className="flex items-start gap-2 text-sm text-slate-600">
                      <FaMapMarkerAlt className="mt-0.5 shrink-0 text-slate-400" />
                      <span>
                        {[street, city, state, zipCode, country]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </p>

                    <p className="flex items-center gap-2 pt-1 text-sm font-semibold text-purple-600">
                      View details <FaArrowRight className="text-xs" />
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
