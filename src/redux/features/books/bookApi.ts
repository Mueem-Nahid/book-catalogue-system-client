import {api} from "../../api/apiSlice.ts";

const bookApi = api.injectEndpoints({
   endpoints:(builder)=>({
      getBooks: builder.query({
         query: ()=> '/books',
      }),
      singleBook: builder.query({
         query: (id:string) => `/books/${id}`,
      }),
      addBook: builder.mutation({
         query: (payload) => ({
            url: '/books',
            method: 'POST',
            body: payload
         }),
      }),
   })
})

export const {
   useGetBooksQuery,
   useSingleBookQuery,
   useAddBookMutation
} = bookApi;