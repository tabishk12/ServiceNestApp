import React from "react";
import ProviderBooking from "./ProviderBooking";
import CustomerBooking from "./CustomerBooking";
import { useSelector } from "react-redux";

const SingleBookingScreen = () => {
  const UserRole = useSelector((state) => state.auth?.userInfo?.role);
  if (UserRole === "provider") {
    return <ProviderBooking />;
  }
  return <CustomerBooking />;
};

export default SingleBookingScreen;
