import {Button, Center, Container, createStyles, Notification, rem, Select, Text, TextInput} from "@mantine/core";
import {bookGenres} from "../constants/globalConstants.ts";
import {DatePickerInput} from "@mantine/dates";
import {useState} from "react";
import {useUpdateBookMutation} from "../redux/features/books/bookApi.ts";
import {useAppSelector} from "../redux/hook.ts";
import {useForm} from "@mantine/form";
import {dateFormatter} from "../utils/utils.ts";

interface UpdateBookFormInputs {
   title: string;
   author: string;
   genre: string;
   publicationDate: Date;
   image: string
}

interface IUpdatedData {
   title?: string;
   author?: string;
   genre?: string;
   publicationDate?: string;
   image?: string
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

function EditBook({
                     id,
                     image,
                     genre,
                     title,
                     publicationDate,
                     author,
                     user
                  }: {
   id: string;
   image: string;
   genre: string;
   title: string;
   publicationDate: string;
   author: string;
   user: string
}) {
   const [successMessage, setSuccessMessage] = useState('');
   const {classes} = useStyles();
   const [updateBook, {isError, error}] = useUpdateBookMutation();
   const {userInfo} = useAppSelector(state => state.user);

   const form = useForm({
      initialValues: {
         title,
         author,
         genre,
         image,
         publicationDate: new Date(publicationDate),
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

   const handleSubmit = async (values: UpdateBookFormInputs) => {
      const updatedData:IUpdatedData = {}
      if(form.isDirty('title'))
         updatedData.title = values.title

      if(form.isDirty('author'))
         updatedData.author = values.author

      if(form.isDirty('image'))
         updatedData.image = values.image

      if(form.isDirty('genre'))
         updatedData.genre = values.genre

      if(form.isDirty('publicationDate')) {
         updatedData.publicationDate = dateFormatter(values.publicationDate)
      }
      try {
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
         // @ts-ignore
         const {data} = await updateBook({id, updatedData})
         setSuccessMessage(data?.message)
      } catch (e) {
         console.log(e)
      }
   }

   return (
      <>
         {
            userInfo?.id !== user ?
               <Center>
                  <Text>Not found</Text>
               </Center> :
               <Container size='sm'>
                  <Center fw='bold' p={25}>
                     Edit Book
                  </Center>
                  <form onSubmit={form.onSubmit(handleSubmit)}>
                     <TextInput {...form.getInputProps('title')} mb={15} label="Title" placeholder="Title"
                                classNames={classes}
                                required/>
                     <TextInput {...form.getInputProps('author')} mb={15} label="Author" placeholder="Author"
                                classNames={classes} required/>
                     <Select {...form.getInputProps('genre')} required data={bookGenres} mb={15} label="Genre"
                             placeholder="Genre" classNames={classes} clearable/>
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
                     <Button type='submit' mt={15}>Update</Button>
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
         }

      </>
   );
}

export default EditBook;