import { Link } from "react-router-dom";
import { useLogoutMutation } from '@slices/Api/authApi';
import {logout} from "@slices/authSlice";
import { persistor } from '@store';
import { useDispatch } from "react-redux";
import LinkComponent from "@components/utils/LinkComponent";
import { useSelector } from "react-redux";

const MenuList = ({isOpen , setIsOpen})=>{
    const [Logout] = useLogoutMutation()
    const dispatch = useDispatch();
    const unreadCount = useSelector((state) => state?.notifications?.unreadCount);

    const handleLogout = async () => {
  try {
    await Logout().unwrap(); 
    dispatch({ type: 'global/reset' }); 
    persistor.purge(); 
    dispatch(logout());
    setIsOpen((prev) => !prev); 
  } catch (err) {
    console.error('Logout failed:', err);
  }
};
    return(
       <>
      <LinkComponent
        to="/bookingDetails"
        label="Bookings"
        onClick={() => setIsOpen(false)}
      /> 
      <LinkComponent
        to="/notifications"
        label={unreadCount > 0 ? (
           <> Notifications
            <sup className="text-xs md:text-md group-hover:bg-transparent hover:transition-all ease duration-300 
           m-1 bg-purple-500 px-2 py-0.5 rounded-full text-white">
              {unreadCount}</sup>
              </>) : ("Notifications")}
        onClick={() => setIsOpen(false)}
      />
        <LinkComponent
          to="/setting"
          label="Settings"
          onClick={() => setIsOpen(false)}
        />
        <LinkComponent
          to="/profile"
          label="Profile"
          onClick={() => setIsOpen(false)}
        />
      <LinkComponent
        to="/"
        label="Logout"
        isLogout
        onClick={() => {
          handleLogout();
          setIsOpen(false);
        }}
     />
    </>
    )
}
export default MenuList;