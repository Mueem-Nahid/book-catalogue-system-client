import {Button, Center, Container, createStyles, rem, TextInput} from '@mantine/core';
import {DatePickerInput} from '@mantine/dates';

const useStyles = createStyles((theme) => ({
   root: {
      position: 'relative',
   },

   input: {
      height: rem(54),
      paddingTop: rem(18),
   },

   label: {
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: theme.fontSizes.xs,
      paddingLeft: theme.spacing.sm,
      paddingTop: `calc(${theme.spacing.sm} / 2)`,
      zIndex: 1,
   },
}));

function AddBook() {
   // You can add these classes as classNames to any Mantine input, it will work the same
   const {classes} = useStyles();

   return (
      <Container size='sm'>
         <Center fw='bold' p={25}>
            Add Book
         </Center>

         <TextInput mb={15} label="Title" placeholder="Title" classNames={classes}/>
         <TextInput mb={15} label="Author" placeholder="Author" classNames={classes}/>
         <TextInput mb={15} label="Genre" placeholder="Genre" classNames={classes}/>
         <DatePickerInput
            mt="md"
            popoverProps={{withinPortal: true}}
            label="Publication date"
            placeholder="When the book was published?"
            classNames={classes}
            clearable={false}
         />
         <Button mt={15}>Save</Button>
      </Container>
   );
}

export default AddBook;