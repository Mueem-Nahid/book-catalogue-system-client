import {Button, Center, Container, createStyles, Notification, rem, Text, TextInput} from '@mantine/core';
import {DatePickerInput} from '@mantine/dates';
import {useForm} from "@mantine/form";
import {dateFormatter} from "../utils/utils.ts";
import {useAddBookMutation} from "../redux/features/books/bookApi.ts";
import {useAppSelector} from "../redux/hook.ts";
import {useState} from "react";

interface AddBookFormInputs {
   title: string;
   author: string;
   genre: string;
   publicationDate: Date;
   image: string
}

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
   const [successMessage, setSuccessMessage] = useState('');
   const {classes} = useStyles();
   const [addBook, {isError, error}] = useAddBookMutation();
   const {userInfo} = useAppSelector(state => state.user);

   const form = useForm({
      initialValues: {
         title: '',
         author: '',
         genre: '',
         image: '',
         publicationDate: new Date(),
      },
      validate: {
         title: (value) => {
            if (!value.trim()) {
               return 'Title should not be empty';
            }
            return null;
         },
         author: (value) => {
            if (!value.trim()) {
               return 'Author should not be empty';
            }
            return null;
         },
         genre: (value) => {
            if (!value.trim()) {
               return 'Genre should not be empty';
            }
            return null;
         },
         image: (value) => {
            if (!value.trim()) {
               return 'Image URL should not be empty';
            }
            return null;
         },
      },
   });

   const handleSubmit = async (values: AddBookFormInputs) => {
      const formattedDate = dateFormatter(values.publicationDate)
      const payload = {
         user: userInfo?.id,
         title: values.title,
         author: values.author,
         genre: values.genre,
         publicationDate: formattedDate,
         image: values.image,
      };
      try {
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
         // @ts-ignore
         const {data} = await addBook(payload)
         form.reset();
         setSuccessMessage(data?.message)
      } catch (e) {
         console.log(e)
      }
   }

   return (
      <Container size='sm'>
         <Center fw='bold' p={25}>
            Add Book
         </Center>
         <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput {...form.getInputProps('title')} mb={15} label="Title" placeholder="Title" classNames={classes}
                       required/>
            <TextInput {...form.getInputProps('author')} mb={15} label="Author" placeholder="Author"
                       classNames={classes} required/>
            <TextInput {...form.getInputProps('genre')} mb={15} label="Genre" placeholder="Genre" classNames={classes}
                       required/>
            <TextInput {...form.getInputProps('image')} mb={15} label="Image Url"
                       placeholder="Please provide an image url of the book"
                       classNames={classes} required/>
            <DatePickerInput
               {...form.getInputProps('publicationDate')}
               mt="md"
               popoverProps={{withinPortal: true}}
               label="Publication date"
               placeholder="When the book was published?"
               classNames={classes}
               clearable={false}
               required
            />
            <Button type='submit' mt={15}>Save</Button>
            {
               isError &&
                <Notification color="red" mt="15px" withCloseButton={false}>
                   {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore*/}
                    <Text color="red">{error?.data.message}</Text>
                </Notification>
            }
            {
               successMessage &&
                <Notification color="green" mt="15px" withCloseButton={false}>
                    <Text color="green">{successMessage}</Text>
                </Notification>
            }
         </form>
      </Container>
   );
}

export default AddBook;