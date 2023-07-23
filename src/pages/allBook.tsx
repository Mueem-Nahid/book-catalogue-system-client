import {AppShell} from "@mantine/core";
import {SearchLayout} from "../layouts/SearchLayout.tsx";
import Books from "../components/Books.tsx";
import {useState} from "react";
import {useGetBooksQuery} from "../redux/features/books/bookApi.ts";

function AllBook() {
   const [searchFields, setSearchFields] = useState('')
   const [filteringFields, setFilteringFields] = useState({
      genre: '',
      publicationDate: ''
   })

   const {data, isLoading, error} = useGetBooksQuery(
      {
         searchTerm: searchFields,
         genre: filteringFields.genre,
         publicationDate: filteringFields.publicationDate
      },
      {
         refetchOnMountOrArgChange: true
      })

   // setBooks(data?.data)


   return (
      <AppShell
         padding="md"
         navbar={<SearchLayout setSearchFields={setSearchFields} setFilteringFields={setFilteringFields}/>}
         styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
         })}
      >
         <Books books={data?.data}  isLoading={isLoading} error={error}/>
      </AppShell>
   );
}

export default AllBook;