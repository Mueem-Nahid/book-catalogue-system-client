import {MantineProvider} from "@mantine/core";
import MainLayout from "./layouts/MainLayout.tsx";
import {useAppDispatch} from "./redux/hook.ts";
import {setCredentials} from "./redux/features/user/userSlice.ts";
import {IUser} from "./types/globalTypes.ts";
import {useEffect} from "react";

function App() {
   const dispatch = useAppDispatch()


   useEffect(() => {
      const checkUser = () => {
         const storedUser: string | null = localStorage.getItem('user');
         const user: IUser | null = storedUser ? JSON.parse(storedUser) : null;
         if (user) {
            dispatch(setCredentials(user));
         }
      }

      checkUser()
   }, [dispatch])


   return (
      <>
         <MantineProvider withGlobalStyles withNormalizeCSS>
            <MainLayout/>
         </MantineProvider>
      </>
   )
}

export default App
