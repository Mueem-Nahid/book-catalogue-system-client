import {Center, Loader, SimpleGrid} from "@mantine/core";
import {SingleCard} from "./SingleCard.tsx";
import {IBook} from "../types/globalTypes.ts";

interface BooksProps {
   books: IBook[] | undefined;
   isLoading: boolean;
   error: any;
   forWishlist?: boolean
}

interface IWishlistBook {
   book: {
      _id: string;
      image: string;
      genre: string;
      publicationDate: string;
      title: string;
      author: string;
      isWishlisted: boolean;
   };
}

function Books({books, isLoading, error}: BooksProps) {

   if (error) {
      return <div>Failed to load data</div>;
   }

   return (
      <>
         <SimpleGrid cols={3} spacing="xl" breakpoints={[{maxWidth: 'md', cols: 1}]}>
            {books?.map((book) => (
               // Check if the book is a regular book or a wishlist book
               'book' in book ? (
                  <SingleCard
                     key={(book as IWishlistBook).book._id}
                     _id={(book as IWishlistBook).book._id}
                     image={(book as IWishlistBook).book.image}
                     genre={(book as IWishlistBook).book.genre}
                     publicationDate={(book as IWishlistBook).book.publicationDate}
                     title={(book as IWishlistBook).book.title}
                     author={(book as IWishlistBook).book.author}
                     isWishlisted={(book as IWishlistBook).book.isWishlisted}
                     forWishlist
                  />
               ) : (
                  <SingleCard
                     key={book._id}
                     _id={book._id}
                     image={book.image}
                     genre={book.genre}
                     publicationDate={book.publicationDate}
                     title={book.title}
                     author={book.author}
                     isWishlisted={book.isWishlisted}
                  />
               )
            ))}
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