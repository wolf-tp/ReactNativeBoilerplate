import { api } from '@config';

export const authAPI = api.injectEndpoints({
  endpoints: builders => ({
    login: builders.mutation<any, { username: string; password: string }>({
      query: params => ({
        url: '/auth/login',
        body: params,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation } = authAPI;
