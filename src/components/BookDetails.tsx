import {ActionIcon, Avatar, Badge, Card, Container, createStyles, Group, Image, Text, Tooltip} from '@mantine/core';
import {IReview} from "../types/globalTypes.ts";
import Reviews from "./Reviews.tsx";
import {IconPencilPlus, IconTrash} from "@tabler/icons-react";
import {useAppSelector} from "../redux/hook.ts";
import {Link} from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal.tsx";
import {useState} from "react";

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
                        id,
                        image,
                        genre,
                        title,
                        publicationDate,
                        author,
                        reviews,
                        user
                     }: {
   id: string;
   image: string;
   genre: string;
   title: string;
   publicationDate: string;
   author: string;
   reviews: ReviewsProp;
   user: string
}) {
   const [showModal, setShowModal] = useState(false);
   const {classes} = useStyles();
   const {userInfo} = useAppSelector(state => state.user);

   return (
      <Container py='lg'>
         <Card withBorder radius="md" p={0} className={classes.card}>
            <Group noWrap spacing={0}>
               <Image src={image} height={460} width={440} fit='fill'/>
               <div className={classes.body}>
                  <Badge>
                     {genre}
                  </Badge>
                  <Text className={classes.title} mt="xs" mb="md">
                     {title}
                  </Text>
                  <Group noWrap spacing="xs" mt="xs" mb="md">
                     <Group spacing="xs" noWrap>
                        <Avatar size={35} color='blue' radius='lg'/>
                        <Text size="sm" fw='bold'>{author}</Text>
                     </Group>
                     <Text size="xs" color="dimmed">
                        •
                     </Text>
                     <Text size="sm" color="dimmed">
                        {publicationDate}
                     </Text>
                  </Group>
                  {
                     user === userInfo?.id &&
                      <Group mt="xs" mb="md" noWrap spacing="xs">
                          <Link to={`/edit-book/${id}`}>
                              <ActionIcon>
                                  <Tooltip label="Edit">
                                      <IconPencilPlus color="green" size="1.2rem"/>
                                  </Tooltip>
                              </ActionIcon>
                          </Link>
                          <ActionIcon onClick={() => setShowModal(true)}>
                              <Tooltip label="Delete">
                                  <IconTrash color='red' size="1.2rem"/>
                              </Tooltip>
                          </ActionIcon>
                      </Group>
                  }
               </div>
            </Group>
         </Card>
         <Container size='sm'>
            <Reviews reviews={reviews} id={id}/>
         </Container>
         {
            showModal && <DeleteConfirmationModal id={id} setShowModal={setShowModal}/>
         }
      </Container>
   );
}

export default BookDetails;