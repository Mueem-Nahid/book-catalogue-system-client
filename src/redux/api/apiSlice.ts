import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8080/api/v1',
      prepareHeaders: (headers, {getState}) => {
         const {user} = getState()
         console.log("accessToken ", user?.accessToken)
         headers.set("authorization", user?.accessToken ? user?.accessToken : "")
         return headers
      }
   }),
   // tagTypes: [],
   endpoints: () => ({}),
});