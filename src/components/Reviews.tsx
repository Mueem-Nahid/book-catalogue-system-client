import {
   Avatar,
   Box,
   Button,
   createStyles,
   Divider,
   Group,
   Notification,
   Paper,
   rem,
   Text,
   Textarea,
   TypographyStylesProvider,
} from "@mantine/core";
import {reviewDateFormat} from "../utils/utils.ts";
import {IReview} from "../types/globalTypes.ts";
import {useForm} from "@mantine/form";
import {usePostCommentMutation} from "../redux/features/books/bookApi.ts";
import {useAppSelector} from "../redux/hook.ts";
import {useLocation, useNavigate} from "react-router-dom";

const useStyles = createStyles((theme) => ({
   comment: {
      padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
   },

   body: {
      paddingLeft: rem(54),
      paddingTop: theme.spacing.sm,
      fontSize: theme.fontSizes.sm,
   },

   content: {
      '& > p:last-child': {
         marginBottom: 0,
      },
   },
}));

type ReviewsProp = IReview[] | undefined;

function Reviews({reviews, id}: { reviews: ReviewsProp, id: string }) {
   const [postComment, {isError, error}] = usePostCommentMutation();
   const {classes} = useStyles();
   const {userInfo} = useAppSelector(state => state.user)
   const previousLocation = useNavigate();
   const {pathname} = useLocation()

   const form = useForm({
      initialValues: {review: ''},

      validate: {
         review: (value) => (value.length < 20 ? 'Review must have at least 20 letters' : null),
      },
   });

   const handleSubmit = async (review: { review: string }) => {
      if (!userInfo?.id) {
         return previousLocation(`/login?redirectTo=${pathname}`);
      }
      try {
         const bookId: string = id;
         postComment({bookId, review});
         form.reset();
      } catch (e) {
         // nothing
      }
   }

   return (
      <Box>
         <Paper p={30} mt={30} radius="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
               <Textarea
                  {...form.getInputProps('review')}
                  placeholder="Post your review..."
                  label="Your review"
                  autosize
                  minRows={2}
                  required
               />
               {
                  isError &&
                   <Notification color="red" mt="10px" withCloseButton={false}>
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/*@ts-ignore*/}
                       <Text color="red">{error?.data.message}</Text>
                   </Notification>
               }
               <Button type="submit" fullWidth mt="xl">
                  Post
               </Button>
            </form>
         </Paper>
         {
            reviews && reviews.length ?
               reviews.map((review: IReview) => (
                  <Paper key={review._id} radius="md" className={classes.comment}>
                     <Group>
                        <Avatar alt={review.reviewedBy.name}
                                radius="xl">{review.reviewedBy.name.substring(0, 1)}</Avatar>
                        <div>
                           <Text fz="sm">{review.reviewedBy.name}</Text>
                           <Text fz="xs" c="dimmed">
                              {reviewDateFormat(review.createdAt)}
                           </Text>
                        </div>
                     </Group>
                     <TypographyStylesProvider className={classes.body}>
                        <div className={classes.content} dangerouslySetInnerHTML={{__html: review.review}}/>
                     </TypographyStylesProvider>
                     <Divider my="sm"/>
                  </Paper>
               )) : ''
         }
      </Box>
   );
}

export default Reviews;