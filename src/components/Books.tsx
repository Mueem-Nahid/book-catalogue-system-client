import {SimpleGrid} from "@mantine/core";
import {SingleCard} from "./SingleCard.tsx";
import {useGetBooksQuery} from "../redux/features/books/bookApi.ts";
import {IBook} from "../types/globalTypes.ts";

function Books() {
   const {data, isLoading, error} = useGetBooksQuery(undefined)

   const books:IBook[] | undefined = data?.data

   if (isLoading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>Failed to load data</div>;
   }

   return (
      <SimpleGrid cols={3} spacing="xl" breakpoints={[{maxWidth: 'md', cols: 1}]}>
         {
            books?.map((book:IBook)=>(
               <SingleCard
                  key={book._id}
                  image='https://img.freepik.com/premium-photo/book-library-with-old-open-textbook-stack-piles-literature-text-archive-reading-desk_779468-5822.jpg?w=1060'
                  genre={book.genre}
                  publicationDate={book.publicationDate}
                  title={book.title}
                  author={book.author}
               />
            ))
         }
      </SimpleGrid>
   );
}

export default Books;