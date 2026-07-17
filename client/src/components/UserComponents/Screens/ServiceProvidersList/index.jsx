import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FaMapMarkerAlt,
  FaStar,
  FaRupeeSign,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useGetProvidersByServiceQuery } from "@slices/Api/service.Api";
import { setSelectedService } from "@slices/service.slice.js";
import Loader from "@components/Utils/Loader";
import PageHeaderBanner from "@components/Utils/PageHeaderBanner";
import BackButton from "@components/Utils/BackButton";
import FilterDropdown from "@components/Utils/FilterDropdown";
import UserAvatar from "@components/Utils/UserAvatar";

const ratingOptions = [
  { value: "", label: "Any rating", shortLabel: "Rating" },
  { value: "2", label: "2+ stars", shortLabel: "2+" },
  { value: "3", label: "3+ stars", shortLabel: "3+" },
  { value: "4", label: "4+ stars", shortLabel: "4+" },
  { value: "4.5", label: "4.5+ stars", shortLabel: "4.5+" },
];

const priceOptions = [
  { value: "", label: "Any price", shortLabel: "Price" },
  { value: "500", label: "Under ₹500 / hr", shortLabel: "≤ ₹500" },
  { value: "1000", label: "Under ₹1,000 / hr", shortLabel: "≤ ₹1,000" },
  { value: "1500", label: "Under ₹1,500 / hr", shortLabel: "≤ ₹1,500" },
  { value: "2000", label: "Under ₹2,000 / hr", shortLabel: "≤ ₹2,000" },
  { value: "3000", label: "Under ₹3,000 / hr", shortLabel: "≤ ₹3,000" },
];

const ServiceProviderList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [openFilter, setOpenFilter] = useState(null);

  const ratingRef = useRef(null);
  const priceRef = useRef(null);

  const { data, isLoading, isFetching } = useGetProvidersByServiceQuery({
    serviceId: id,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ratingRef.current?.contains(event.target) ||
        priceRef.current?.contains(event.target)
      ) {
        return;
      }
      setOpenFilter(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (provider) => {
    dispatch(setSelectedService(provider));
    navigate("/address");
  };

  const providers = data?.providers || [];

  const filteredProviders = useMemo(() => {
    const locationQuery = location.trim().toLowerCase();
    const ratingValue = minRating === "" ? null : Number(minRating);
    const priceValue = maxPrice === "" ? null : Number(maxPrice);

    return providers.filter((provider) => {
      const detail = provider.spDetails?.[0] || {};
      const providerLocation = (provider.location || "").toLowerCase();
      const rating = Number(detail.rating ?? 0);
      const price = Number(detail.price ?? 0);

      if (locationQuery && !providerLocation.includes(locationQuery)) {
        return false;
      }
      if (
        ratingValue != null &&
        !Number.isNaN(ratingValue) &&
        rating < ratingValue
      ) {
        return false;
      }
      if (
        priceValue != null &&
        !Number.isNaN(priceValue) &&
        price > priceValue
      ) {
        return false;
      }
      return true;
    });
  }, [providers, location, minRating, maxPrice]);

  const clearFilters = () => {
    setLocation("");
    setMinRating("");
    setMaxPrice("");
    setOpenFilter(null);
  };

  const showLoader = isLoading || isFetching;

  return (
    <div className="min-h-screen bg-white p-4 pt-1">
      <div className="flex w-full flex-col gap-4">
        <PageHeaderBanner />

        <div className="mb-2 flex flex-wrap justify-between gap-3 mb-8">
          <BackButton to="/browse-services" />

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Filter by location"
              className="w-full min-w-64 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base outline-none focus:ring-2 focus:ring-purple-500 sm:w-80 md:w-96"
            />

            <FilterDropdown
              label="Rating"
              icon={<FaStar className="text-yellow-400" />}
              value={minRating}
              options={ratingOptions}
              onChange={setMinRating}
              open={openFilter === "rating"}
              onToggle={() =>
                setOpenFilter((prev) => (prev === "rating" ? null : "rating"))
              }
              menuRef={ratingRef}
            />

            <FilterDropdown
              label="Price"
              icon={<FaMoneyBillWave className="text-amber-600" />}
              value={maxPrice}
              options={priceOptions}
              onChange={setMaxPrice}
              open={openFilter === "price"}
              onToggle={() =>
                setOpenFilter((prev) => (prev === "price" ? null : "price"))
              }
              menuRef={priceRef}
            />

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>

      {showLoader ? (
        <div className="mt-0 flex items-center justify-center">
          <Loader text="Loading providers..." />
        </div>
      ) : (
        <div className="grid gap-4 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProviders.map((provider) => {
            const [
              {
                rating,
                price,
                availability,
                description: serviceDescription,
              } = {},
            ] = provider.spDetails || [];

            return (
              <div
                key={provider._id}
                className="mb-4 rounded-lg border border-gray-800 p-3 shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <UserAvatar
                    name={provider.name}
                    imageUrl={provider.imageUrl}
                  />
                  <div className="min-w-0 flex-1 space-y-1 text-slate-700">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-bold text-slate-900">
                        {provider.name}
                      </h3>
                      <span className="flex shrink-0 items-center gap-1 font-semibold text-slate-800">
                        {rating ?? "—"} <FaStar className="text-yellow-400" />
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaMapMarkerAlt className="text-slate-500" />
                      <span>
                        {provider.location
                          ? provider.location.charAt(0).toUpperCase() +
                            provider.location.slice(1)
                          : "—"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-sm font-bold text-slate-800">
                      <FaRupeeSign className="text-xs" />
                      <span>
                        {price != null
                          ? `${Number(price).toLocaleString("en-IN")} / hr`
                          : "—"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <FaClock className="text-slate-500" />
                      <span>{availability || "—"}</span>
                    </div>
                  </div>
                </div>

                {serviceDescription && (
                  <p className="mt-3 text-sm text-slate-800">
                    {serviceDescription}
                  </p>
                )}
                <div className="flex w-full gap-4">
                  <button
                    className="mt-2 w-full rounded-2xl border border-gray-800 p-3 font-bold transition-all duration-300 hover:bg-gray-800 hover:text-white hover:shadow-lg"
                    onClick={() => handleAction(provider)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!showLoader && filteredProviders.length === 0 && (
        <p className="px-4 pb-6 text-slate-600">No providers found.</p>
      )}
    </div>
  );
};

export default ServiceProviderList;
