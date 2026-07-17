import { get } from "mongoose";
import { BASE_URL, SERVICE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const serviceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => ({
        url: `${SERVICE_URL}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),

    getProvidersByService: builder.query({
      query: ({ serviceId, location }) => {
        const params = new URLSearchParams();
        if (location?.trim()) params.set("location", location.trim());
        const queryString = params.toString() ? `?${params.toString()}` : "";
        return {
          url: `${SERVICE_URL}/${serviceId}/providers${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Service"],
    }),

    getAvailableServices: builder.query({
      query: (userId) => ({
        url: `${SERVICE_URL}/available/${userId}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    registerService: builder.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
    deleteService: builder.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/delete`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Profile", "Service"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useGetProvidersByServiceQuery,
  useGetAvailableServicesQuery,
  useRegisterServiceMutation,
  useDeleteServiceMutation,
} = serviceApiSlice;
