import {Box, Container} from "@mantine/core";
import {Navbar} from "./Navbar.tsx";
import {Outlet} from "react-router-dom";
import {Footer} from "./Footer.tsx";


function MainLayout() {
   return (
      <Container fluid>
         <Navbar/>
         <Box>
            <Outlet/>
         </Box>
         <Footer/>
      </Container>
   );
}

export default MainLayout;