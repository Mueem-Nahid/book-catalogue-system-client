import Books from "../components/Books.tsx";
import {useGetWishlistQuery} from "../redux/features/wishlist/wishlistApi.ts";
import {Container} from "@mantine/core";


function MyWishListPage() {
   const {data, isLoading, error} = useGetWishlistQuery(undefined);
   console.log(data?.data)
   return (
      <Container size="lg">
         <Books books={data?.data} isLoading={isLoading} error={error}/>
      </Container>
   );
}

export default MyWishListPage;