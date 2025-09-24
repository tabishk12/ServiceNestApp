import {useMarkAsReadMutation} from "@slices/Api/notification.Api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUnread, setUnreadCount } from "@slices/notificationSlice";
import { useGetNotificationsQuery } from "@slices/Api/notification.Api";

const Notification = ({notifications }) => {
  const dispatch = useDispatch();
 const navigate = useNavigate();

  useEffect(() => {
    if (notifications?.length > 0) {
      const unread = notifications.filter((n) => !n.isRead).length;
      dispatch(setUnreadCount(unread));
    }
  }, [notifications, dispatch]);

  // ✅ Clear when page is opened
  useEffect(() => {
    dispatch(clearUnread());
  }, [dispatch]);

 const [markAsRead] = useMarkAsReadMutation();


  const handleClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification._id);
    }
      navigate(`/notification/${notification.bookingId}`);
    
  }


  return (
<>
<div> 
      {notifications?.map((n) => (
        <div key={n._id} className={`p-4 m-2 rounded-lg ${n.isRead?'':'bg-blue-100'} shadow-sm` }
         onClick={() =>{handleClick(n)} }>
          <h4 className="font-semibold">{n.title}</h4>
          <p>{n.message}</p>
          <p className="text-gray-500 text-sm">{new Date(n.createdAt).toLocaleString()}</p>
          {n.isRead ? (
            <span className="text-green-500 text-sm cursore-pointer">Read</span>
          ) : (
            <span className="text-red-500 text-sm cursore-pointer">Unread</span>
          )}
            <hr className="h-[1px]"/>
        </div>
      ))}
    </div>
</>  )
}

export default Notification;