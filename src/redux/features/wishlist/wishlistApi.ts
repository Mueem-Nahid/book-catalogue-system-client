import {api} from "../../api/apiSlice.ts";

const wishlistApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getWishlist: builder.query({
         query: () => '/wishlist'
      }),
      addToWishlist: builder.mutation({
         query: (id) => ({
            url: `/wishlist/${id}`,
            method: 'POST',
         }),
      }),
   })
})

export const {
   useGetWishlistQuery,
   useAddToWishlistMutation
} = wishlistApi;