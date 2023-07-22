import {Code, createStyles, Group, Navbar, rem, Select, Text, TextInput,} from '@mantine/core';
import {IconSearch,} from '@tabler/icons-react';
import {YearPicker} from "@mantine/dates";
import {IBookGenre} from "../types/globalTypes.ts";

const useStyles = createStyles((theme) => ({
   navbar: {
      paddingTop: 0,
   },

   section: {
      marginLeft: `calc(${theme.spacing.md} * -1)`,
      marginRight: `calc(${theme.spacing.md} * -1)`,
      marginBottom: theme.spacing.md,

      '&:not(:last-of-type)': {
         borderBottom: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
         }`,
      },
   },

   searchCode: {
      fontWeight: 700,
      fontSize: rem(10),
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      border: `${rem(1)} solid ${
         theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
      }`,
   },

   mainLinks: {
      paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
      paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
      paddingBottom: theme.spacing.md,
   },

   mainLink: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      fontSize: theme.fontSizes.xs,
      padding: `${rem(8)} ${theme.spacing.xs}`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

      '&:hover': {
         backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
         color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
   },

   mainLinkInner: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
   },

   mainLinkIcon: {
      marginRight: theme.spacing.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
   },

   mainLinkBadge: {
      padding: 0,
      width: rem(20),
      height: rem(20),
      pointerEvents: 'none',
   },

   collections: {
      paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
      paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
      paddingBottom: theme.spacing.md,
   },

   collectionsHeader: {
      paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
      paddingRight: theme.spacing.md,
      marginBottom: rem(5),
   },

   collectionLink: {
      display: 'block',
      padding: `${rem(8)} ${theme.spacing.xs}`,
      textDecoration: 'none',
      borderRadius: theme.radius.sm,
      fontSize: theme.fontSizes.xs,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      lineHeight: 1,
      fontWeight: 500,

      '&:hover': {
         backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
         color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
   },
}));

const bookGenres: IBookGenre[] = [
   'Fiction',
   'Non-Fiction',
   'Young Adult (YA)',
   'Children\'s',
   'Poetry',
   'Classic Literature',
   'Graphic Novels/Comics',
   'Mystery/Thriller',
   'Science and Technology',
   'Biography',
   'Romance',
   'Self-Help/Motivational',
   'Fantasy',
   'Science Fiction',
   'Horror',
];

export function SearchLayout() {
   const {classes} = useStyles();

   return (
      <Navbar height={700} width={{sm: 300}} p="md" className={classes.navbar}>
         <TextInput
            placeholder="Search"
            size="xs"
            icon={<IconSearch size="0.8rem" stroke={1.5}/>}
            rightSectionWidth={70}
            rightSection={<Code className={classes.searchCode}>Enter</Code>}
            styles={{rightSection: {pointerEvents: 'none'}}}
            mb="sm"
         />
         {/*<Button compact hidden={true}>Search</Button>*/}

         <Text mt={5} size="xs" weight={500} color="dimmed">
            Filter books by genre
         </Text>
         <Select size="xs" mt={5} mb="sm" data={bookGenres} clearable/>

         <Text mt={5} size="xs" weight={500} color="dimmed">
            Filter books by year
         </Text>
         <Group mt={5} position="center">
            <YearPicker
               minDate={new Date(1920, 1)}
               maxDate={new Date(2023, 1)}
            />
         </Group>
      </Navbar>
   );
}