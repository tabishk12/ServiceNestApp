import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import PageHeaderBanner from "@components/Utils/PageHeaderBanner";
import BackButton from "@components/Utils/BackButton";
import { useGetAllServicesQuery } from "@slices/Api/service.Api";

const BrowseServices = () => {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(timer);
  }, [query]);

  const {
    data: services = [],
    isLoading,
    isError,
    error,
  } = useGetAllServicesQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const filteredServices = useMemo(() => {
    if (!debouncedQuery) return services;
    return services.filter((service) => {
      const name = service.name?.toLowerCase() || "";
      const category = service.category?.toLowerCase() || "";
      return name.includes(debouncedQuery) || category.includes(debouncedQuery);
    });
  }, [services, debouncedQuery]);

  return (
    <>
      <PageHeaderBanner />
      <div className="mx-4 mt-4">
        <BackButton to="/" />
      </div>
      {isLoading ? (
        <div className="mx-4 mt-6 rounded-xl bg-white p-8 text-center text-slate-600">
          Loading services...
        </div>
      ) : null}
      {isError ? (
        <div className="mx-4 mt-6 rounded-xl bg-white p-8 text-center text-red-600">
          Unable to load services. {error?.message || "Please try again."}
        </div>
      ) : null}
      {!isLoading && !isError ? (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 p-8 bg-white mt-6 mb-10 mx-4 rounded-xl">
          {filteredServices.map((service) => (
            <Link key={service._id} to={`/services/${service._id}`}>
              <div className="flex flex-col justify-between border rounded-lg p-3 text-center shadow hover:shadow-md">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="h-32 mx-auto object-cover rounded-lg mb-2"
                />
                <h2 className="font-bold text-lg">{service.name}</h2>
                <p className="text-gray-500 text-sm">{service.category}</p>
                <button className="border-2 border-purple-300 text-purple-700 hover:bg-purple-500 hover:text-white px-4 py-2 mt-2 rounded-md flex items-center gap-2 justify-center ease-in-out duration-300">
                  Book Now <FaArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default BrowseServices;
