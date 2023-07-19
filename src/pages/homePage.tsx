import {HeroSection} from "../components/HeroSection.tsx";
import {Container} from "@mantine/core";
import {LatestBooksSection} from "../components/LatestBooksSection.tsx";
import {useGetBooksQuery} from "../redux/features/books/bookApi.ts";
import {Footer} from "../layouts/Footer.tsx";


function HomePage() {
   const {data} = useGetBooksQuery(undefined)
   return (
      <Container px='0' fluid>
         <HeroSection/>
         <LatestBooksSection books={data?.data}/>
         <Footer/>
      </Container>
   );
}

export default HomePage;