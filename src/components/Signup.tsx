import {Anchor, Button, Container, Paper, PasswordInput, Text, TextInput, Title,} from '@mantine/core';

export function Signup() {
   return (
      <Container size={420} my={40}>
         <Title
            pt="35px"
            align="center"
            sx={(theme) => ({fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900})}
         >
            Welcome to Book Shelf!
         </Title>
         <Text color="dimmed" size="sm" align="center" mt={5}>
            Already have an account?{' '}
            <Anchor size="sm" component="button">
               Sign in
            </Anchor>
         </Text>

         <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Email" placeholder="you@mantine.dev" required/>
            <PasswordInput label="Password" placeholder="Your password" required mt="md"/>
            <Button fullWidth mt="xl">
               Sign up
            </Button>
         </Paper>
      </Container>
   );
}