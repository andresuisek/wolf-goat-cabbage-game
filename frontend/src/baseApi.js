// api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = 'http://127.0.0.1:8000/api/';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: url }), // Ajusta la URL de la API según tu configuración
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: 'create_user/',
        method: 'POST',
        body: credentials,
      }),
    }),
    getRatings: builder.query({
      query: () => 'ratings/' // Ajusta la URL según la configuración de tu API
    }),
    createRating: builder.mutation({
      query: (rating) => ({
        url: 'ratings/',
        method: 'POST',
        body: rating,
      }),
    }),
    getGameHistory: builder.query({
      query: () => 'gamehistory/' // Ajusta la URL según la configuración de tu API
    }),
    createGameHistory: builder.mutation({
      query: (gameHistory) => ({
        url: 'gamehistory/',
        method: 'POST',
        body: gameHistory,
      }),
    }),
    // getHumidity: builder.query({
    //   query: () => 'humidity/'
    // }),
    // getTemperature: builder.query({
    //   query: () => 'temperature/'      
    // }),
  })
});

export const { useRegisterUserMutation, useGetRatingsQuery, useCreateRatingMutation, useGetGameHistoryQuery, useCreateGameHistoryMutation, } = baseApi;