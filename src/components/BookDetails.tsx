import {createStyles, Card, Image, Avatar, Text, Group, Container} from '@mantine/core';
import {IReview} from "../types/globalTypes.ts";
import Reviews from "./Reviews.tsx";

const useStyles = createStyles((theme) => ({
   card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
   },

   title: {
      fontWeight: 700,
      fontSize: "50px",
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      lineHeight: 1.2,
   },

   body: {
      padding: theme.spacing.xl,
   },
}));

type ReviewsProp = IReview[] | undefined;

function BookDetails({
                        image,
                        genre,
                        title,
                        publicationDate,
                        author,
                        reviews,
                     }: {
   image: string;
   genre: string;
   title: string;
   publicationDate: string;
   author: string;
   reviews: ReviewsProp; // Use the updated type here
}) {
   const {classes} = useStyles();

   return (
      <Container py='lg'>
         <Card withBorder radius="md" p={0} className={classes.card}>
            <Group noWrap spacing={0}>
               <Image src={image} height={460} width={440} fit='fill'/>
               <div className={classes.body}>
                  <Text transform="uppercase" color="dimmed" weight={700} size="xs">
                     {genre}
                  </Text>
                  <Text className={classes.title} mt="xs" mb="md">
                     {title}
                  </Text>
                  <Group noWrap spacing="xs">
                     <Group spacing="xs" noWrap>
                        <Avatar size={30}/>
                        <Text size="xs" fw='bold'>{author}</Text>
                     </Group>
                     <Text size="xs" color="dimmed">
                        •
                     </Text>
                     <Text size="xs" color="dimmed">
                        {publicationDate}
                     </Text>
                  </Group>
               </div>
            </Group>
         </Card>
         <Container size='sm'>
            <Reviews reviews={reviews}/>
         </Container>
      </Container>
   );
}

export default BookDetails;