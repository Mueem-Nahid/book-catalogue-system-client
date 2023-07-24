import EditBook from "../components/EditBook.tsx";
import {useParams} from "react-router-dom";
import {useSingleBookQuery} from "../redux/features/books/bookApi.ts";
import {Center} from "@mantine/core";


function EditBookPage() {
   const {id} = useParams();
   const {data} = useSingleBookQuery(id!)
   return (
      <>
         {
            data?.data ?
               <EditBook
                  image={data?.data.image}
                  genre={data?.data.genre}
                  publicationDate={data?.data.publicationDate}
                  title={data?.data.title}
                  author={data?.data.author}
                  id={id!}
                  user={data?.data?.user}
               />
               :
               <Center>Not found</Center>
         }
      </>
   );
}

export default EditBookPage;