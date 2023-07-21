import BookDetails from "../components/BookDetails.tsx";
import {useParams} from "react-router-dom";
import {useSingleBookQuery} from "../redux/features/books/bookApi.ts";
import {Center} from "@mantine/core";


function BookDetailsPage() {
   const {id} = useParams();
   const {data} = useSingleBookQuery(id!)

   return (
      <>
         {
            data?.data ?
               <BookDetails
                  image={data?.data.image}
                  genre={data?.data.genre}
                  publicationDate={data?.data.publicationDate}
                  title={data?.data.title}
                  author={data?.data.author}
                  reviews={data?.data.reviews}
                  id={id!}
               />
               :
               <Center>Not found</Center>
         }

      </>
   );
}

export default BookDetailsPage;