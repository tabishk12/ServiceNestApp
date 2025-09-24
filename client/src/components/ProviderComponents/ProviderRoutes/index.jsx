// src/roles/provider/routes.js
import ProviderHomeScreen from '@providerComponent/screens/HomeScreen';
import BookingsDetailScreen from '@providerComponent/screens/BookingsDetailScreen';
import ProfilePage from '@providerComponent/Profile';
import SettingsPage from '@Components/screens/Settingpage';
import NotificationScreen from '@components/screens/NotificationScreen';
import AddressPage from '@components/UpdateAddress';
import SingleBookingScreen from '@components/screens/SingleBooking';
import EditDetails from '@components/screens/EditDetails';
import RegisterService from '../../screens/RegisterService';
import SpDetails from '../Profile/SpDetails';

export const providerRoutes = [
  { index: true, element: <ProviderHomeScreen /> },
  {
     path: "/bookings/:id", 
    element: <BookingsDetailScreen />
 },
   { 
    path: "/profile",
     element: <ProfilePage />
     },
    {
         path: "/notifications",
          element: <NotificationScreen /> 
        },
    {
         path: "/setting",
          element: <SettingsPage /> 
        },
    {
         path: "/bookingDetails",
          element: <BookingsDetailScreen/> 
    },
    { path: "/Add-address", 
            element: <AddressPage /> 
     },
    { path: "/notification/:bookingId",
             element: < SingleBookingScreen />
    },
      { path: "/edit", element: <EditDetails /> },
      
      { path: "/ServiceList", element: <SpDetails/> },
      { path: "/Add-Services", element: <RegisterService /> },

  // Add more provider-only routes here...
];
