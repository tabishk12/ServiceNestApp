import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { setUnreadCount } from "@slices/notificationSlice";
import { useGetNotificationsQuery } from "@slices/Api/notification.Api";
import { skipToken } from "@reduxjs/toolkit/query";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // ✅ safer query (skip when no user)
  const { data, isSuccess } = useGetNotificationsQuery(
    userInfo?._id ?? skipToken
  );

  // ✅ normalize: backend may return { notifications: [...] }
  const notifications = data?.notifications || data || [];

  useEffect(() => {
    if (isSuccess) {
      const unread = notifications.filter((n) => !n.isRead).length;
      dispatch(setUnreadCount(unread));
    }
  }, [notifications, isSuccess, dispatch]);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
