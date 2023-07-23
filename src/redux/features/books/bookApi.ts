import {api} from "../../api/apiSlice.ts";

interface IGetAllBookParams {
   searchTerm?: string;
   publicationDate?: string;
   genre?: string;
}

const bookApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getBooks: builder.query({
         query: (params: IGetAllBookParams | null) => {
            console.log(params, "<<<<<<<<<<<")
            const queryParams = new URLSearchParams();

            if (params?.searchTerm) {
               queryParams.append('searchTerm', params.searchTerm);
            }
            if (params?.publicationDate) {
               queryParams.delete('publicationDate');
               queryParams.append('publicationDate', params.publicationDate);
            }
            if (params?.genre) {
               queryParams.delete('genre');
               queryParams.append('genre', params.genre);
            }

            return `/books?${queryParams.toString()}`;
         },
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