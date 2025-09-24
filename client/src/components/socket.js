import io from "socket.io-client";
import { store } from "@store";
import { incrementUnread } from "@slices/notificationSlice";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("⚡ Connected to socket server");
});

// ✅ When a new notification comes
socket.on("notification", (notification) => {
  console.log("📩 New notification:", notification);
  store.dispatch(incrementUnread());
});

export default socket;
