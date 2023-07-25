import {api} from "../../api/apiSlice.ts";

const wishlistApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getWishlist: builder.query({
         query: () => '/wishlist',
         providesTags: ['getWishlist', 'login']
      }),
      addToWishlist: builder.mutation({
         query: (id) => ({
            url: `/wishlist/${id}`,
            method: 'POST',
         }),
         invalidatesTags:['getWishlist']
      }),
   })
})

export const {
   useGetWishlistQuery,
   useAddToWishlistMutation
} = wishlistApi;