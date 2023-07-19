import {ActionIcon, Avatar, Badge, Card, createStyles, Group, Image, rem, Text,} from '@mantine/core';
import {IconBookmark, IconHeart, IconShare} from '@tabler/icons-react';
import {IBook} from "../types/globalTypes.ts";

const useStyles = createStyles((theme) => ({
   card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
   },

   title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
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
                              image,
                              genre,
                              title,
                              publicationDate,
                              author,
                           }: IBook) {
   const {classes, theme} = useStyles();

   return (
      <Card withBorder padding="lg" radius="md" className={classes.card}>
         <Card.Section mb="sm">
            <Image src={image} alt={title} height={180} fit="fill"/>
         </Card.Section>

         <Badge>{genre}</Badge>

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
                     <IconHeart size="1.2rem" color={theme.colors.red[6]} stroke={1.5}/>
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