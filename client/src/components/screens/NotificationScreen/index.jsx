import { useGetNotificationsQuery } from "@slices/Api/notification.Api.js";
import Loader from "@utils/Loader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Notification from "./notification.jsx";

const NotificationScreen = () =>{
  const navigate = useNavigate();
  const userId  = useSelector((state) => state.auth?.userInfo?._id);
  const { data: notifications, isLoading } = useGetNotificationsQuery(userId, {
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
});
  return (
    <>
 {isLoading&& <Loader text="Loading notifications..." />} 

{!isLoading && (!notifications || notifications.length === 0) && (
    (<div className="h-[90vh] flex flex-col gap-4 justify-center items-center text-2xl ">
      <p>No notifications found.</p>
      <button 
      className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4"
      onClick={()=>{navigate('/')}}>Home</button>
      </div>)
  )}


    {(!isLoading && notifications)&&<div className="min-h-screen bg-white pt-3">   
       <Notification notifications={notifications}
       userId={userId} 
       />
     </div>}
    </>
  );
}

export default NotificationScreen;