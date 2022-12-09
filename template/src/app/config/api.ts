import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@store/all-reducers';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-nanamedi-pa.dev-medi.kod-hc.info/api',
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
