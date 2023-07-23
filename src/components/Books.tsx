import {Center, Loader, SimpleGrid} from "@mantine/core";
import {SingleCard} from "./SingleCard.tsx";
import {useGetBooksQuery} from "../redux/features/books/bookApi.ts";
import {IBook} from "../types/globalTypes.ts";
import {useEffect} from "react";

interface BooksProps {
   books: IBook[] | undefined;
   setBooks: (books: IBook[] | undefined) => void;
}

function Books({books, setBooks}: BooksProps) {
   const {data, isLoading, error} = useGetBooksQuery(
      null,
      {
         refetchOnMountOrArgChange: true
      })

   // const books: IBook[] | undefined = data?.data


   useEffect(() => {
      setBooks(data?.data)
   }, [data?.data])


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
      </>
   );
}

export default Books;