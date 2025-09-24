import { apiSlice } from "./apiSlice";

export const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/booking",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Booking"],
    }),

    getBookingHistory: builder.query({
      query: (userId) => `/booking/history/${userId}`,
      providesTags: ["BookingHistory"],
    }),

    getBookings: builder.query({
      query: (ProviderId) => `/booking/ProviderBooking/${ProviderId}`,
      providesTags: ["Booking"], 
    }),
    getSinleBooking: builder.query({
      query: (bookingId) => `/booking/${bookingId}`,
      providesTags: ["Booking"], 
    }),

    updateStatus: builder.mutation({
      query: ({ bookingId, orderStatus }) => ({
        url: `/booking/${bookingId}/status`,
        method: "PUT",
        body: { orderStatus },
      }),
      invalidatesTags: ["Booking"], 
    }),
    
    createRating:builder.mutation({
      query:({bookingId,providerId,serviceId,rating,comment})=>({
        url:`/booking/${bookingId}/createRating`,
        method: "PUT",
        body:{bookingId,providerId,serviceId,rating,comment},
      }),
      invalidatesTags: ["Booking","User"], 
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingHistoryQuery,
  useGetBookingsQuery,
  useUpdateStatusMutation,
  useGetSinleBookingQuery,
  useCreateRatingMutation,
} = bookingApi;
