import {AppShell} from "@mantine/core";
import {SearchLayout} from "../layouts/SearchLayout.tsx";
import Books from "../components/Books.tsx";
import {useState} from "react";
import {IBook} from "../types/globalTypes.ts";

function AllBook() {
   const [books, setBooks] = useState<IBook[]>([]);

   const handleSetBooks = (newBooks: IBook[] | undefined) => {
      setBooks(newBooks || []);
   };

   return (
      <AppShell
         padding="md"
         navbar={<SearchLayout setBooks={setBooks}/>}
         styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
         })}
      >
         <Books books={books} setBooks={handleSetBooks}/>
      </AppShell>
   );
}

export default AllBook;