// src/roles/customer/routes.js
import HomeScreen from '@components/screens/HomeScreen';
import BrowseServices from '@components/UserComponents/Screens/BrowseServices';
import ServiceProviderList from '@components/UserComponents/Screens/ServiceProvidersList';
import AddressPage from '@components/UserComponents/Screens/Address';
import PaymentPage from '@userComponent/Screens/Payment';
import OrderHistory from '@components/UserComponents/Screens/OrderHistory';
import ProfilePage from '@userComponent/Profile';
import SettingsPage from '@Components/screens/Settingpage';
import NotificationScreen from '@components/screens/NotificationScreen';
import EditDetails from '@components/screens/EditDetails';
import SingleBookingScreen from '@components/screens/SingleBooking';

export const customerRoutes = [
  { index: true, element: <HomeScreen /> },
  { path: "/browse-services", element: <BrowseServices /> },
  { path: "/services/:id", element: <ServiceProviderList /> },
  { path: "/address", element: <AddressPage /> },
  { path: "/payment", element: <PaymentPage /> },
  { path: "/order-history", element: <OrderHistory /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/notifications", element: <NotificationScreen /> },
  { path: "/setting", element: <SettingsPage /> },
  { path: "/edit", element: <EditDetails /> },
  { path: "/notification/:bookingId", element: < SingleBookingScreen /> },
  
];
