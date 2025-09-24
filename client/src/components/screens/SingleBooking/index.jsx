import React from 'react'
import ProviderBooking from './ProviderBooking';
import CustomerBooking from './CustomerBooking';
import { useSelector } from 'react-redux';

const SingleBookingScreen= ()=> {

  const UserRole = useSelector((state) => state.auth?.userInfo?.role);
  if (UserRole === 'provider') {  
    return <ProviderBooking />;
  }
  if (UserRole === 'customer') {
    return <CustomerBooking />;
  }
  <CustomerBooking/>
}

export default SingleBookingScreen