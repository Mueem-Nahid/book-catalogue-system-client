import {ActionIcon, Center, Container, createStyles, Group, Image, rem, Text} from '@mantine/core';
import {IconBrandInstagram, IconBrandTwitter, IconBrandYoutube} from '@tabler/icons-react';
import BookSelfLogo from "../assets/book-shelf-logo.png";

const useStyles = createStyles((theme) => ({
   footer: {
      marginTop: rem(120),
      borderTop: `${rem(1)} solid ${
         theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
   },

   inner: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,

      [theme.fn.smallerThan('xs')]: {
         flexDirection: 'column',
      },
   },

   links: {
      [theme.fn.smallerThan('xs')]: {
         marginTop: theme.spacing.md,
      },
   },
}));

export function Footer() {
   const {classes} = useStyles();

   return (
      <div className={classes.footer}>
         <Container className={classes.inner}>
            <Image src={BookSelfLogo} height={60} width={80}/>
            <Center>
               <Text color='gray'>mueem51@gmail.com</Text>
            </Center>
            <Group spacing={0} className={classes.links} position="right" noWrap>
               <ActionIcon size="lg">
                  <IconBrandTwitter size="1.05rem" stroke={1.5}/>
               </ActionIcon>
               <ActionIcon size="lg">
                  <IconBrandYoutube size="1.05rem" stroke={1.5}/>
               </ActionIcon>
               <ActionIcon size="lg">
                  <IconBrandInstagram size="1.05rem" stroke={1.5}/>
               </ActionIcon>
            </Group>
         </Container>
      </div>
   );
}