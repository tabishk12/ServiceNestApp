import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

  login: builder.mutation({
  query: (credentials) => ({
    url: `${USERS_URL}/login`,
    method: 'POST',
    body: credentials,
    credentials: 'include',
  }),
}),
logout: builder.mutation({
  query: () => ({
    url: `${USERS_URL}/logout`,
    method: 'POST',
    credentials: 'include', 
  }),
}),
    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ["Profile"],
    }),
     register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
        credentials: 'include', 
      }),
      providesTags: ["Profile"],
      invalidatesTags: ["Profile"],
    }),

  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = usersApiSlice;
