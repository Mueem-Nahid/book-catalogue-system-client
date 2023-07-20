import {Box, Burger, Button, createStyles, Divider, Drawer, Group, Header, rem, ScrollArea,} from '@mantine/core';
import {MantineLogo} from '@mantine/ds';
import {useDisclosure} from '@mantine/hooks';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/hook.ts";
import {logOutUser} from "../redux/features/user/userSlice.ts";

const useStyles = createStyles((theme) => ({
   link: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontWeight: 700,
      fontSize: theme.fontSizes.sm,

      [theme.fn.smallerThan('sm')]: {
         height: rem(42),
         display: 'flex',
         alignItems: 'center',
         width: '100%',
      },

      ...theme.fn.hover({
         backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      }),
   },

   subLink: {
      width: '100%',
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      borderRadius: theme.radius.md,

      ...theme.fn.hover({
         backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      }),

      '&:active': theme.activeStyles,
   },

   dropdownFooter: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      margin: `calc(${theme.spacing.md} * -1)`,
      marginTop: theme.spacing.sm,
      padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
      paddingBottom: theme.spacing.xl,
      borderTop: `${rem(1)} solid ${
         theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
   },

   hiddenMobile: {
      [theme.fn.smallerThan('sm')]: {
         display: 'none',
      },
   },

   hiddenDesktop: {
      [theme.fn.largerThan('sm')]: {
         display: 'none',
      },
   },
}));

export function Navbar() {
   const dispatch = useAppDispatch()
   const {userInfo} = useAppSelector(state => state.user);
   const [drawerOpened, {toggle: toggleDrawer, close: closeDrawer}] = useDisclosure(false);
   const {classes, theme} = useStyles();

   const handleLogout = () => {
      dispatch(logOutUser())
   }

   return (
      <Box mb='60px'>
         <Header height={60} px="md" fixed>
            <Group position="apart" sx={{height: '100%'}}>
               <MantineLogo size={30}/>

               <Group sx={{height: '100%'}} spacing={0} className={classes.hiddenMobile}>
                  <Link to='/' className={classes.link}>
                     Home
                  </Link>
                  <Link to='/all-books' className={classes.link}>
                     All Books
                  </Link>
               </Group>

               <Group className={classes.hiddenMobile}>
                  {
                     userInfo?.name ?
                        <Button variant="default" onClick={handleLogout}>Log out</Button>
                        :
                        <>
                           <Link to='/login'>
                              <Button variant="default">Log in</Button>
                           </Link>
                           <Link to='/signup'>
                              <Button>Sign up</Button>
                           </Link>
                        </>
                  }
               </Group>

               <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop}/>
            </Group>
         </Header>

         <Drawer
            opened={drawerOpened}
            onClose={closeDrawer}
            size="100%"
            padding="md"
            title="Book Self"
            className={classes.hiddenDesktop}
            zIndex={1000000}
         >
            <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
               <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}/>
               <Link to='/' className={classes.link}>
                  Home
               </Link>
               <Link to='/all-books' className={classes.link}>
                  All Books
               </Link>
               <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}/>
               <Group position="center" grow pb="xl" px="md">
                  {
                     userInfo?.name ?
                        <Button variant="default" onClick={handleLogout}>Log out</Button>
                        :
                        <>
                           <Link to='/login'>
                              <Button variant="default">Log in</Button>
                           </Link>
                           <Link to='/signup'>
                              <Button>Sign up</Button>
                           </Link>
                        </>
                  }
               </Group>
            </ScrollArea>
         </Drawer>
      </Box>
   );
}