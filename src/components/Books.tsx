import {Center, Loader, SimpleGrid} from "@mantine/core";
import {SingleCard} from "./SingleCard.tsx";
import {IBook} from "../types/globalTypes.ts";

interface BooksProps {
   books: IBook[] | undefined;
   isLoading: boolean;
   error: any; // Replace `any` with the appropriate type for error, if possible
}

function Books({books, isLoading, error}: BooksProps) {

   if (error) {
      return <div>Failed to load data</div>;
   }

   return (
      <>
         <SimpleGrid cols={3} spacing="xl" breakpoints={[{maxWidth: 'md', cols: 1}]}>
            {
               books?.map((book: IBook) => (
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
         {
            isLoading &&
             <Center>
                 <Loader/>
             </Center>
         }
         {
            !isLoading && !books?.length &&
             <Center>No data found</Center>
         }
      </>
   );
}

export default Books;