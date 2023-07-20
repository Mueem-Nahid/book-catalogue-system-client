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
                  _id={book._id}
                  image={book.image}
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