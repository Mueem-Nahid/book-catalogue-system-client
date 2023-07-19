import {HeroSection} from "../components/HeroSection.tsx";
import {Container} from "@mantine/core";
import {LatestBooksSection} from "../components/LatestBooksSection.tsx";
import {useGetBooksQuery} from "../redux/features/books/bookApi.ts";
import {Footer} from "../layouts/Footer.tsx";
import {IBook} from "../types/globalTypes.ts";


function HomePage() {
   const data = useGetBooksQuery(undefined)
   const books:IBook[] = data?.data?.data
   return (
      <Container px='0' fluid>
         <HeroSection/>
         <LatestBooksSection books={books}/>
         <Footer/>
      </Container>
   );
}

export default HomePage;