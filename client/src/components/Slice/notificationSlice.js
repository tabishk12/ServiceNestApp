// slices/notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    unreadCount: 0,
  },
  reducers: {
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
    incrementUnread: (state) => {
      state.unreadCount += 1;
    },
    clearUnread: (state) => {
      state.unreadCount = 0;
    },
  },
});

export const { setUnreadCount, incrementUnread, clearUnread } =
  notificationSlice.actions;

export default notificationSlice.reducer;
