import {api} from "../../api/apiSlice.ts";

const bookApi = api.injectEndpoints({
   endpoints:(builder)=>({
      getBooks: builder.query({
         query: ()=> '/books',
      }),
      singleBook: builder.query({
         query: (id:string) => `/books/${id}`,
      })
   })
})

export const {
   useGetBooksQuery,
   useSingleBookQuery,
} = bookApi;