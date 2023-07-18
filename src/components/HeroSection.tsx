import {Button, Container, createStyles, Overlay, rem, Text, Title} from '@mantine/core';

const useStyles = createStyles((theme) => ({
   wrapper: {
      position: 'relative',
      paddingTop: rem(180),
      paddingBottom: rem(130),
      backgroundImage:
         'url(https://images.unsplash.com/photo-1573164713988-8665fc963095?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=980&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',

      [theme.fn.smallerThan('xs')]: {
         paddingTop: rem(80),
         paddingBottom: rem(50),
      },
   },

   inner: {
      position: 'relative',
      zIndex: 1,
   },

   title: {
      fontWeight: 800,
      fontSize: rem(40),
      letterSpacing: rem(-1),
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      color: theme.white,
      marginBottom: theme.spacing.xs,
      textAlign: 'center',
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [theme.fn.smallerThan('xs')]: {
         fontSize: rem(28),
         textAlign: 'left',
      },
   },

   highlight: {
      color: theme.colors[theme.primaryColor][4],
   },

   description: {
      color: theme.colors.gray[0],
      textAlign: 'center',

      [theme.fn.smallerThan('xs')]: {
         fontSize: theme.fontSizes.md,
         textAlign: 'left',
      },
   },

   controls: {
      marginTop: `calc(${theme.spacing.xl} * 1.5)`,
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,

      [theme.fn.smallerThan('xs')]: {
         flexDirection: 'column',
      },
   },

   control: {
      height: rem(42),
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
         marginLeft: theme.spacing.md,
      },

      [theme.fn.smallerThan('xs')]: {
         '&:not(:first-of-type)': {
            marginTop: theme.spacing.md,
            marginLeft: 0,
         },
      },
   },

   secondaryControl: {
      color: theme.white,
      backgroundColor: 'rgba(255, 255, 255, .4)',

      '&:hover': {
         backgroundColor: 'rgba(255, 255, 255, .45) !important',
      },
   },
}));

export function HeroSection() {
   const {classes} = useStyles();

   return (
      <div className={classes.wrapper}>
         <Overlay color="#000" opacity={0.65} zIndex={1}/>

         <div className={classes.inner}>
            <Title className={classes.title}>
               Discover the World of Books: {' '}
               <Text component="span" inherit className={classes.highlight}>
                  Unleash Your Imagination!
               </Text>
            </Title>

            <Container fluid>
               <Text size="md" className={classes.description}>
                  Welcome to our Book Catalog Application, where the captivating world of books comes to life. Embark on
                  a journey of endless possibilities as you explore a vast collection of literary treasures. From
                  timeless classics to contemporary bestsellers, our catalog is a haven for all book lovers. Immerse
                  yourself in gripping narratives, unravel thought-provoking mysteries, and embark on epic adventures
                  from the comfort of your own device. Whether you're seeking inspiration, knowledge, or pure
                  entertainment, our Book Catalog Application is your gateway to an enchanting realm where imagination
                  knows no bounds. Begin your literary odyssey today and let the pages turn!
               </Text>
            </Container>

            <div className={classes.controls}>
               <Button className={classes.control} variant="white" size="lg">
                  Explore all books
               </Button>
            </div>
         </div>
      </div>
   );
}