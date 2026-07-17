import io from "socket.io-client";
import { store } from "@store";
import { incrementUnread } from "@slices/notificationSlice";
import { SOCKET_URL } from "@slices/constants";

const socket = io(SOCKET_URL, {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("⚡ Connected to socket server");
});

socket.on("notification", (notification) => {
  console.log("📩 New notification:", notification);
  store.dispatch(incrementUnread());
});

export default socket;
