import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, ADDRESS_URL } from '../constants';
import { apiSlice } from './apiSlice';


export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAddress: builder.mutation({
      query: ({ userId, address }) => ({
        url: `/address/create`,
        method: 'POST',
        body: { userId, ...address },
      }),
      invalidatesTags: ['Address'],
    }),

    getAddressById: builder.query({
      query: (id) => `/address/${id}`,
      providesTags: ['Address'],
    }),

    updateAddress: builder.mutation({
      query: ({ id, ...updatedAddress }) => ({
        url: `/address/${id}`,
        method: 'PUT',
        body: updatedAddress,
      }),
      invalidatesTags: ['Address'],
    }),

    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/address/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Address'],
    }),
  }),
});

export const {
  useCreateAddressMutation,
  useGetAddressByIdQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApiSlice;
