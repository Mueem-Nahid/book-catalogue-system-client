import {ActionIcon, Avatar, Badge, Card, createStyles, Group, Image, Loader, rem, Text, Tooltip,} from '@mantine/core';
import {IconBookmark, IconHeartFilled, IconHeartPlus, IconShare} from '@tabler/icons-react';
import {IBook} from "../types/globalTypes.ts";
import {Link} from "react-router-dom";
import {useAddToWishlistMutation} from "../redux/features/wishlist/wishlistApi.ts";
import {useState} from "react";

const useStyles = createStyles((theme) => ({
   card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
   },

   title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      color: theme.colorScheme === 'dark' ? 'white' : 'black',
      textDecoration: 'none'
   },

   footer: {
      padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
      marginTop: theme.spacing.md,
      borderTop: `${rem(1)} solid ${
         theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
   },
}));

export function SingleCard({
                              _id,
                              image,
                              genre,
                              title,
                              publicationDate,
                              author,
                              isWishlisted
                           }: IBook) {
   const {classes, theme} = useStyles();
   const [addToWishlist, {isLoading}] = useAddToWishlistMutation();
   const [wishlistState, setWishlistState] = useState(isWishlisted);

   const handleWishlist = async () => {
      try {
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
         // @ts-ignore
         const {data} = await addToWishlist(_id);
         if (data?.statusCode === 201) {
            setWishlistState(!wishlistState);
         } else if (!data) {
            setWishlistState(!wishlistState);
         }
      } catch (e) {
         console.log(e)
      }
   }

   return (
      <Card withBorder padding="lg" radius="md" className={classes.card}>
         <Link to={`/book/${_id}`}>
            <Card.Section mb="sm">
               <Image src={image} alt={title} height={180} fit="fill"/>
            </Card.Section>
            <Badge>{genre}</Badge>
         </Link>

         <Text fw={700} className={classes.title} mt="xs">
            {title}
         </Text>

         <Group mt="lg">
            <Avatar radius="sm"/>
            <div>
               <Text fw={500}>{author}</Text>
            </div>
         </Group>

         <Card.Section className={classes.footer}>
            <Group position="apart">
               <Text fz="xs" c="dimmed">
                  Publication date: {publicationDate}
               </Text>
               <Group spacing={0}>
                  <ActionIcon>
                     {
                        !isLoading &&
                        (wishlistState ?
                              <Tooltip title='Wishlisted' label="Wishlisted">
                                 <IconHeartFilled
                                    onClick={handleWishlist}
                                    style={{color: "red"}}
                                    size="1.2rem"
                                 />
                              </Tooltip>
                              :
                              <Tooltip title='Add to wishlist' label="Add to wishlist">
                                 <IconHeartPlus
                                    onClick={handleWishlist}
                                    size="1.2rem"
                                    color={theme.colors.red[6]}
                                 />
                              </Tooltip>
                        )
                     }
                     {
                        isLoading && <Loader size={"xs"}/>
                     }
                  </ActionIcon>
                  <ActionIcon>
                     <IconBookmark size="1.2rem" color={theme.colors.yellow[6]} stroke={1.5}/>
                  </ActionIcon>
                  <ActionIcon>
                     <IconShare size="1.2rem" color={theme.colors.blue[6]} stroke={1.5}/>
                  </ActionIcon>
               </Group>
            </Group>
         </Card.Section>
      </Card>
   );
}