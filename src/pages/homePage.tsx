import {HeroSection} from "../components/HeroSection.tsx";
import {Container} from "@mantine/core";
import {LatestBooksSection} from "../components/LatestBooksSection.tsx";


function HomePage() {
   return (
      <Container px='0' fluid>
         <HeroSection/>
         <LatestBooksSection/>
      </Container>
   );
}

export default HomePage;