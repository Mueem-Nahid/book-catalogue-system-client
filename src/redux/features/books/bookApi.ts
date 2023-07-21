import {api} from "../../api/apiSlice.ts";

const bookApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getBooks: builder.query({
         query: () => '/books',
      }),
      singleBook: builder.query({
         query: (id: string) => `/books/${id}`,
         providesTags: ['reviews']
      }),
      addBook: builder.mutation({
         query: (payload) => ({
            url: '/books',
            method: 'POST',
            body: payload
         }),
      }),
      postComment: builder.mutation({
         query: ({bookId, review}) => ({
            url: `/books/${bookId}/reviews`,
            method: 'POST',
            body: review
         }),
         invalidatesTags: ['reviews'],
      })
   })
})

export const {
   useGetBooksQuery,
   useSingleBookQuery,
   useAddBookMutation,
   usePostCommentMutation
} = bookApi;