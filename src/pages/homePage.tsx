import {HeroSection} from "../components/HeroSection.tsx";
import {Container} from "@mantine/core";
import {LatestBooksSection} from "../components/LatestBooksSection.tsx";
import {useGetBooksQuery} from "../redux/features/books/bookApi.ts";


function HomePage() {
   const {data} = useGetBooksQuery(undefined)
   console.log("dataa ", data)
   return (
      <Container px='0' fluid>
         <HeroSection/>
         <LatestBooksSection books={data?.data}/>
      </Container>
   );
}

export default HomePage;