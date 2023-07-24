import {Button, createStyles, Group, Navbar, rem, Select, Text, TextInput,} from '@mantine/core';
import {IconSearch,} from '@tabler/icons-react';
import {YearPicker} from "@mantine/dates";
import {useForm} from "@mantine/form";
import {Dispatch, SetStateAction} from "react";
import {bookGenres} from "../constants/globalConstants.ts";

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


interface SearchLayoutProps {
   setSearchFields: Dispatch<SetStateAction<string>>;
   setFilteringFields: Dispatch<SetStateAction<{ genre: string; publicationDate: string }>>;
}

export function SearchLayout({setSearchFields, setFilteringFields}: SearchLayoutProps) {
   const {classes} = useStyles();

   const form = useForm({
      initialValues: {
         searchTerm: '',
      },
      validate: {
         searchTerm: (value) => {
            if (!value.trim()) {
               setSearchFields('')
               return 'Enter search term';
            }
            return null;
         },
      },
   });

   const handleSearch = (values: { searchTerm: string }) => {
      if (values?.searchTerm)
         setSearchFields(values.searchTerm)
   }

   const handleFilering = (name: string, value: string | Date) => {
      if (name === 'publicationDate' && value) {
         setFilteringFields((prevFields) => ({
            ...prevFields,
            [name]: (value as Date).getFullYear().toString(),
         }));
      } else {
         setSearchFields('');
         setFilteringFields((prevFields) => ({
            ...prevFields,
            [name]: value
         }));
      }
   }

   return (
      <Navbar height={700} width={{sm: 300}} p="md" className={classes.navbar}>
         <form onSubmit={form.onSubmit(handleSearch)}>
            <TextInput
               {...form.getInputProps('searchTerm')}
               placeholder="Search"
               size="xs"
               icon={<IconSearch size="0.8rem" stroke={1.5}/>}
               rightSectionWidth={70}
               rightSection={
                  <Button
                     compact
                     my={15}
                     size="xs"
                     variant="subtle"
                     type="submit"
                     style={{pointerEvents: 'all'}}
                  >
                     Search
                  </Button>
               }
               styles={{rightSection: {pointerEvents: 'none'}}}
               mb="sm"
            />
         </form>

         <Text mt={5} size="xs" weight={500} color="dimmed">
            Filter books by genre
         </Text>
         <Select size="xs" mt={5} mb="sm"
                 onChange={(value: string) => handleFilering("genre", value)} data={bookGenres} clearable/>

         <Text mt={5} size="xs" weight={500} color="dimmed">
            Filter books by year
         </Text>
         <Group mt={5} position="center">
            <YearPicker
               allowDeselect
               onChange={(value: Date) => handleFilering("publicationDate", value)}
               minDate={new Date(1920, 1)}
               maxDate={new Date(2023, 1)}
            />
         </Group>
      </Navbar>
   );
}