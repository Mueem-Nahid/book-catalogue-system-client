import {Anchor, Button, Container, Paper, PasswordInput, Text, TextInput, Title,} from '@mantine/core';

export function Login() {
   return (
      <Container size={420} my={40}>
         <Title
            align="center"
            sx={(theme) => ({fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900})}
         >
            Welcome back to Book Shelf!
         </Title>
         <Text color="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{' '}
            <Anchor size="sm" component="button">
               Create account
            </Anchor>
         </Text>

         <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Email" placeholder="you@mantine.dev" required/>
            <PasswordInput label="Password" placeholder="Your password" required mt="md"/>
            <Button fullWidth mt="xl">
               Sign in
            </Button>
         </Paper>
      </Container>
   );
}