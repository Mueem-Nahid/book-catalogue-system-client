import {AppShell} from "@mantine/core";
import {SearchLayout} from "../layouts/SearchLayout.tsx";
import Books from "../components/Books.tsx";

function AllBook() {
   return (
      <AppShell
         padding="md"
         navbar={<SearchLayout />}
         styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
         })}
      >
         <Books/>
      </AppShell>
   );
}

export default AllBook;