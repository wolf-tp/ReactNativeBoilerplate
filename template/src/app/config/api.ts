import {
  BaseQueryFn,
  QueryReturnValue,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '@store/all-reducers';

const baseApi = fetchBaseQuery({
  baseUrl: 'https://api-nanamedi-pa.dev-medi.kod-hc.info/api',
  credentials: 'include',

  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result: MaybePromise<
    QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
  > = await baseApi(args, api, extraOptions);

  const refreshToken = (api.getState() as RootState)?.auth?.token;

  if ((result?.error as Record<string, unknown>)?.originalStatus === 401) {
    const refreshResult = await baseApi(
      {
        url: '/customer/refresh-token',
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      },
      { ...api },
      extraOptions,
    );
    console.log(
      refreshResult,
      'Save Innocent Lives Stop war Save Gaza Say Yes to peace and No to war',
    );
    if (refreshResult.data) {
      // api?.dispatch(
      //   setAuthenticated({
      //     ...refreshResult?.data,
      //     isAuthenticated: true,
      //   }),
      // );

      result = await baseApi(args, api, extraOptions);
    } else {
      // api.dispatch(logout());
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  // default cache time is 60 minutes
  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 60 * 1000,
});
