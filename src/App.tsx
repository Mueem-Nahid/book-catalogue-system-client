import {MantineProvider} from "@mantine/core";
import MainLayout from "./layouts/MainLayout.tsx";

function App() {

   return (
      <>
         <MantineProvider withGlobalStyles withNormalizeCSS>
            <MainLayout/>
         </MantineProvider>
      </>
   )
}

export default App
