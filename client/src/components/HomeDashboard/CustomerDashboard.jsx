import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSearch,
  FaBroom,
  FaWrench,
  FaSnowflake,
  FaBolt,
  FaPaintRoller,
  FaTruck,
} from "react-icons/fa";
import { useGetBookingHistoryQuery } from "@slices/Api/booking.Api";
import { useGetAllServicesQuery } from "@slices/Api/service.Api";
import MetricBar from "./MetricBar";
import HelpSupportCard from "./HelpSupportCard";

const categoryIcons = [
  { match: /clean/i, icon: FaBroom, color: "bg-sky-100 text-sky-700" },
  { match: /plumb/i, icon: FaWrench, color: "bg-amber-100 text-amber-700" },
  {
    match: /ac|air|cool/i,
    icon: FaSnowflake,
    color: "bg-cyan-100 text-cyan-700",
  },
  { match: /electr/i, icon: FaBolt, color: "bg-yellow-100 text-yellow-700" },
  { match: /paint/i, icon: FaPaintRoller, color: "bg-rose-100 text-rose-700" },
  { match: /./, icon: FaTruck, color: "bg-purple-100 text-purple-700" },
];

const getCategoryStyle = (name = "") =>
  categoryIcons.find((item) => item.match.test(name)) || categoryIcons.at(-1);

const normalizeStatus = (status = "") => status.toLowerCase();

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef(null);
  const userId = useSelector((state) => state.auth.userInfo?._id);
  const { data: bookings = [] } = useGetBookingHistoryQuery(userId, {
    skip: !userId,
  });
  const { data: services = [] } = useGetAllServicesQuery();

  const activeBookings = useMemo(
    () =>
      bookings.filter((b) =>
        ["pending", "confirmed"].includes(normalizeStatus(b.status)),
      ),
    [bookings],
  );

  const recentBookings = useMemo(() => bookings.slice(0, 4), [bookings]);

  const activeTracker = activeBookings[0];

  const savedProviders = useMemo(() => {
    const ids = new Set(
      bookings
        .map((b) => b.providerId?._id || b.providerId)
        .filter(Boolean)
        .map(String),
    );
    return ids.size;
  }, [bookings]);

  const topServices = useMemo(() => (services || []).slice(0, 6), [services]);

  const suggestions = useMemo(() => {
    const list = services || [];
    const q = search.trim().toLowerCase();
    if (!q) return list.slice(0, 6);
    return list
      .filter((service) => {
        const name = service.name?.toLowerCase() || "";
        const category = service.category?.toLowerCase() || "";
        return name.includes(q) || category.includes(q);
      })
      .slice(0, 8);
  }, [services, search]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const metrics = [
    { label: "Active Bookings", value: activeBookings.length },
    { label: "Saved Providers", value: savedProviders },
    { label: "Wallet Balance", value: "₹0" },
  ];

  const goToBrowse = (query = search) => {
    setShowDropdown(false);
    setActiveIndex(-1);
    navigate(
      query.trim()
        ? `/browse-services?q=${encodeURIComponent(query.trim())}`
        : "/browse-services",
    );
  };

  const selectSuggestion = (service) => {
    setSearch(service.name || "");
    setShowDropdown(false);
    setActiveIndex(-1);
    navigate(`/services/${service._id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      selectSuggestion(suggestions[activeIndex]);
      return;
    }
    goToBrowse();
  };

  const handleKeyDown = (e) => {
    if (!showDropdown || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  };

  const statusLabel = (status) => {
    const s = normalizeStatus(status);
    if (s === "confirmed") return "On the way / Confirmed";
    if (s === "pending") return "Waiting for provider";
    if (s === "completed") return "Completed";
    return status || "No active job";
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4 px-3 pb-8">
      <MetricBar metrics={metrics} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-10">
        {/* Left 70% */}
        <div className="space-y-4 lg:col-span-7">
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-lg font-bold text-slate-800">
              What do you need help with?
            </h2>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1" ref={searchRef}>
                <FaSearch className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                    setActiveIndex(-1);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search cleaning, plumbing, AC repair..."
                  className="w-full rounded-xl border border-purple-400 bg-slate-50 py-3 pl-10 pr-3 text-sm font-medium outline-none ring-purple-500 focus:ring-2"
                  autoComplete="off"
                  role="combobox"
                  aria-expanded={showDropdown}
                  aria-autocomplete="list"
                />
                {showDropdown && (
                  <ul
                    role="listbox"
                    className="absolute left-0 right-0 top-full z-20 mt-1 max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
                  >
                    {suggestions.length === 0 ? (
                      <li className="px-4 py-3 text-sm text-slate-500">
                        No services found
                      </li>
                    ) : (
                      suggestions.map((service, index) => {
                        const style = getCategoryStyle(service.name);
                        const Icon = style.icon;
                        return (
                          <li
                            key={service._id}
                            role="option"
                            aria-selected={index === activeIndex}
                          >
                            <button
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => selectSuggestion(service)}
                              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition ${
                                index === activeIndex
                                  ? "bg-purple-50 text-purple-800"
                                  : "text-slate-700 hover:bg-purple-50"
                              }`}
                            >
                              <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm ${style.color}`}
                              >
                                <Icon />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate font-semibold">
                                  {service.name}
                                </span>
                                {service.category && (
                                  <span className="block truncate text-xs text-slate-500">
                                    {service.category}
                                  </span>
                                )}
                              </span>
                            </button>
                          </li>
                        );
                      })
                    )}
                  </ul>
                )}
              </div>
              <button
                type="submit"
                className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700"
              >
                Search
              </button>
            </form>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">
                Service Categories
              </h2>
              <Link
                to="/browse-services"
                className="text-sm font-semibold text-purple-600 hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {topServices.length === 0 && (
                <p className="col-span-full text-sm text-slate-500">
                  No services available yet.
                </p>
              )}
              {topServices.map((service) => {
                const style = getCategoryStyle(service.name);
                const Icon = style.icon;
                return (
                  <Link
                    key={service._id}
                    to={`/services/${service._id}`}
                    className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 p-3 text-center transition hover:border-purple-200 hover:bg-purple-50"
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${style.color}`}
                    >
                      <Icon />
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {service.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">
                Recent Bookings
              </h2>
              <Link
                to="/order-history"
                className="text-sm font-semibold text-purple-600 hover:underline"
              >
                History
              </Link>
            </div>
            <div className="space-y-3">
              {recentBookings.length === 0 && (
                <p className="text-sm text-slate-500">
                  No bookings yet. Browse services to get started.
                </p>
              )}
              {recentBookings.map((order) => {
                const serviceId = order.serviceId?._id;
                return (
                  <div
                    key={order._id}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/booking/${order._id}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigate(`/booking/${order._id}`);
                      }
                    }}
                    className="flex cursor-pointer flex-col gap-3 rounded-lg border border-slate-100 p-3 transition hover:border-purple-200 hover:bg-purple-50/40 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {order.serviceId?.name || "Service"}
                      </p>
                      <p className="text-sm text-slate-500">
                        {order.providerId?.name || "Provider"} ·{" "}
                        {new Date(order.bookingDate).toLocaleDateString()}
                      </p>
                      <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold capitalize text-slate-600">
                        {order.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/booking/${order._id}`);
                        }}
                        className="rounded-lg border border-purple-200 bg-white px-3 py-2 text-center text-sm font-bold text-purple-700 hover:bg-purple-50"
                      >
                        View details
                      </button>
                      {serviceId && (
                        <Link
                          to={`/services/${serviceId}`}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-lg bg-purple-600 px-3 py-2 text-center text-sm font-bold text-white hover:bg-purple-700"
                        >
                          Book Again
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right 30% */}
        <div className="space-y-4 lg:col-span-3">
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-lg font-bold text-slate-800">
              Active Booking Tracker
            </h2>
            {activeTracker ? (
              <div className="rounded-lg bg-purple-50 p-3">
                <p className="text-sm font-semibold text-purple-800">
                  {activeTracker.serviceId?.name || "Service"}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Provider: {activeTracker.providerId?.name || "—"}
                </p>
                <p className="mt-2 text-sm font-bold text-purple-700">
                  {statusLabel(activeTracker.status)}
                </p>
                <Link
                  to={`/booking/${activeTracker._id}`}
                  className="mt-3 inline-block text-sm font-semibold text-purple-600 hover:underline"
                >
                  View details
                </Link>
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No active bookings right now.
              </p>
            )}
          </section>

          <section className="rounded-xl border border-amber-100 bg-amber-50 p-4 shadow-sm">
            <h2 className="mb-2 text-lg font-bold text-amber-900">
              Promo Center
            </h2>
            <p className="text-sm text-amber-800">
              Use code <span className="font-extrabold">NEST10</span> for 10%
              off your next booking.
            </p>
            <p className="mt-2 text-xs font-semibold text-amber-700">
              Seasonal offer · Valid this month
            </p>
          </section>

          <HelpSupportCard role="customer" />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
