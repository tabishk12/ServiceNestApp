import { apiSlice } from "./apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNotification: builder.mutation({
      query: (data) => ({
        url: "/notifications",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Notifications"], 
      providesTags: ["Notifications"],
    }),

    getNotifications: builder.query({
      query: (userId) => `/notifications/${userId}`,
      providesTags: ["Notifications"],
    }),

    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      providesTags: ["Notifications"],
      invalidatesTags: ["Notifications"],

    }),

    markAllAsRead: builder.mutation({
      query: (userId) => ({
        url: `/notifications/${userId}/read-all`,
        method: "PATCH",
      }),
      providesTags: ["Notifications"],
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} = notificationApiSlice;
