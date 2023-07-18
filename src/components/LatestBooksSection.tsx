import {Container, createStyles, rem, SimpleGrid, Title,} from '@mantine/core';
import {SingleCard} from "./SingleCard.tsx";


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

export function LatestBooksSection({books}) {
   const {classes} = useStyles();

   return (
      <Container size="lg" py="xl">

         <Title order={2} className={classes.title} ta="center" mt="sm">
            Latest Books
         </Title>

         <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{maxWidth: 'md', cols: 1}]}>
            {
               books?.map((book:object)=>(
                  <SingleCard
                     key={book._id}
                     image='https://img.freepik.com/premium-photo/book-library-with-old-open-textbook-stack-piles-literature-text-archive-reading-desk_779468-5822.jpg?w=1060'
                     genre={book.genre}
                     publicationDate={book.publicationDate}
                     title={book.title}
                     author={book.author}
                  />
               ))
            }
         </SimpleGrid>
      </Container>
   );
}