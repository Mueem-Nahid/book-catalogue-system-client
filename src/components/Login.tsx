import {Anchor, Button, Container, Notification, Paper, PasswordInput, Text, TextInput, Title,} from '@mantine/core';
import {useForm} from "@mantine/form";
import {useLoginUserMutation} from "../redux/features/user/userApi.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../redux/hook.ts";
import {setCredentials} from "../redux/features/user/userSlice.ts";
import {IUser} from "../types/globalTypes.ts";

interface LoginFormInputs {
   email: string;
   password: string;
   user?: IUser;
}

export function Login() {
   const navigate = useNavigate()
   const dispatch = useAppDispatch()
   const [loginUser, {isError, error, isSuccess}] = useLoginUserMutation()

   const form = useForm({
      initialValues: {
         email: '',
         password: '',
      },
      validate: {
         email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      },
   });

   const handleSubmit = async (values: LoginFormInputs) => {
      try {
         const response = await loginUser(values);
         const user: IUser = response?.data.data;
         dispatch(setCredentials(user));
         localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
         // Handle login error
      }
   }

   useEffect(() => {
      isSuccess && navigate('/')
   }, [isSuccess, navigate])

   return (
      <Container size={420} my={40}>
         <Title
            pt="35px"
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
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={form.onSubmit(handleSubmit)}>
               <TextInput {...form.getInputProps('email')} label="Email" placeholder="you@gmail.com" required/>
               <PasswordInput {...form.getInputProps('password')} label="Password" placeholder="Your password" required
                              mt="md"/>
               <Button type="submit" fullWidth mt="xl">
                  Sign in
               </Button>
            </form>
            {
               isError &&
                <Notification color="red" mt="10px" withCloseButton={false}>
                    <Text color="red">{error?.data.message}</Text>
                </Notification>
            }
         </Paper>
      </Container>
   );
}