import { useState } from "react";
import DataRow from "@utils/DataRow";
import Loader from "@utils/Loader";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useDeleteServiceMutation } from "@slices/Api/service.Api";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "@slices/Api/authApi";

const SpDetails = () => {
  const userId = useSelector((state) => state.auth?.userInfo?._id);
  const [DeleteService] = useDeleteServiceMutation();
  const location = useLocation();
  const { data: profile, isLoading } = useGetProfileQuery(userId);

  const [showAll, setShowAll] = useState(false);

  if (isLoading) return <Loader text="Loading Details" />;
  if (!profile) return null;

  const SpDetails = profile?.user?.spDetails || [];
  const pathName = location.pathname || {};
  const title = "My Service Portfolio";

  const handleDelete = async (ServiceId) => {
    const confirmed = window.confirm("Are you sure you want to delete this service?");
    if (!confirmed) return;
    const data = await DeleteService({ userId, ServiceId }).unwrap();
    console.log("Deleted:", data);
  };

  // Function to print stars
  const printStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 > 0;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) stars.push(<FaStar key={i} className="inline text-yellow-500" />);
      else if (i === fullStars && hasHalfStar) stars.push(<FaStarHalfAlt key={i} className="inline text-yellow-500" />);
      else stars.push(<FaRegStar key={i} className="inline text-yellow-500" />);
    }
    return stars;
  };

  // Limit services if not in ServiceList page
  const displayedServices =
    pathName === "/ServiceList"
      ? SpDetails
      : showAll
      ? SpDetails
      : SpDetails.slice(0, 3); // show only 3 initially

  return (
    <div className={`m-3 ${pathName === "/ServiceList" ? "bg-white p-2" : ""}`}>
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        {pathName === "/ServiceList" && title}
      </h2>

      {displayedServices && displayedServices.length > 0 ? (
        displayedServices.map((detail, index) => (
          <div
            key={index}
            className="mt-4 p-3 border rounded-lg bg-white shadow-sm flex justify-between"
          >
            <div>
              <DataRow label="Description" value={detail.description} />
              <DataRow label="Price" value={`₹${detail.price}`} />
              <DataRow label="Availability" value={detail.availability} />
              <DataRow
                label="Rating"
                value={
                  <>
                    {detail.rating} {printStars(detail.rating)}
                  </>
                }
              />
            </div>
            <div
              className={`${pathName === "/ServiceList" ? "block" : "hidden"}`}
              onClick={() => {
                handleDelete(detail.serviceId);
              }}
            >
              <XMarkIcon
                title="Remove Service"
                className="h-5 w-5 text-white bg-red-500"
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4 cursor-pointer">
          No services registered yet.
        </p>
      )}

      {/* Show more/less toggle only on profile page */}
      {pathName !== "/ServiceList" && SpDetails.length > 3 && (
        <p
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 text-center mt-4 cursor-pointer hover:underline"
        >
          {showAll ? "Show Less" : "Show More"}
        </p>
      )}

      <div
        className={`flex justify-between md:justify-center gap-6 lg:gap-[5em] ${
          pathName === "/ServiceList" ? "block" : "hidden"
        }`}
      >
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Link to="/Add-Services">Add New Service</Link>
        </button>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
        >
          <Link to="/profile">Visit Profile</Link>
        </button>
      </div>
    </div>
  );
};

export default SpDetails;
