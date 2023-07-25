import {Center, Container, createStyles, Loader, rem, SimpleGrid, Title,} from '@mantine/core';
import {SingleCard} from "./SingleCard.tsx";
import {IBook} from "../types/globalTypes.ts";


const useStyles = createStyles((theme) => ({
   title: {
      fontSize: rem(34),
      fontWeight: 900,

      [theme.fn.smallerThan('sm')]: {
         fontSize: rem(24),
      },
   },

   description: {
      maxWidth: 600,
      margin: 'auto',

      '&::after': {
         content: '""',
         display: 'block',
         backgroundColor: theme.fn.primaryColor(),
         width: rem(45),
         height: rem(2),
         marginTop: theme.spacing.sm,
         marginLeft: 'auto',
         marginRight: 'auto',
      },
   },

   card: {
      border: `${rem(1)} solid ${
         theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
   },

   cardTitle: {
      '&::after': {
         content: '""',
         display: 'block',
         backgroundColor: theme.fn.primaryColor(),
         width: rem(45),
         height: rem(2),
         marginTop: theme.spacing.sm,
      },
   },
}));

interface LatestBooksSectionProps {
   books: IBook[];
   isLoading: boolean;
}

export function LatestBooksSection({books, isLoading}: LatestBooksSectionProps) {
   const {classes} = useStyles();

   return (
      <Container size="lg" py='2.5rem'>

         <Title order={2} className={classes.title} ta="center" mt="sm">
            Latest Books
         </Title>
         {
            isLoading && <Center mt={20}><Loader/></Center>
         }
         {
            books &&
             <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{maxWidth: 'md', cols: 1}]}>
                {
                   books?.slice(0, 10)?.map((book: IBook) => (
                      <SingleCard
                         key={book._id}
                         _id={book._id}
                         image={book.image}
                         genre={book.genre}
                         publicationDate={book.publicationDate}
                         title={book.title}
                         author={book.author}
                         isWishlisted={book?.isWishlisted}
                      />
                   ))
                }
             </SimpleGrid>
         }
      </Container>
   );
}