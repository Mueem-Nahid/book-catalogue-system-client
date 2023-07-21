import {
   Avatar,
   Box,
   Button,
   createStyles,
   Divider,
   Group,
   Paper,
   rem,
   Text,
   Textarea,
   TypographyStylesProvider,
} from "@mantine/core";
import {reviewDateFormat} from "../utils/utils.ts";
import {IReview} from "../types/globalTypes.ts";
import {useForm} from "@mantine/form";

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

function Reviews({reviews}: { reviews: ReviewsProp }) {
   const {classes} = useStyles();

   const form = useForm({
      initialValues: {review: ''},

      validate: {
         review: (value) => (value.length < 20 ? 'Review must have at least 20 letters' : null),
      },
   });

   const handleSubmit = () => {

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
                     <Avatar alt={review.reviewedBy.name} radius="xl">{review.reviewedBy.name.substring(0, 1)}</Avatar>
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