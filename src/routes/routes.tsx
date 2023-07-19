import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import HomePage from "../pages/homePage.tsx";
import LoginPage from "../pages/loginPage.tsx";
import SignupPage from "../pages/signupPage.tsx";
import AllBook from "../pages/allBook.tsx";

const routes = createBrowserRouter([
   {
      path: '/',
      element: <App/>,
      children:[
         {
            index:true,
            element: <HomePage/>
         },
         {
            path: '/login',
            element: <LoginPage/>,
         },
         {
            path: '/signup',
            element: <SignupPage/>,
         },
         {
            path: '/all-books',
            element: <AllBook/>,
         },
         /* {
            path: '*',
            element: <NotFound/>,
         },*/
      ]
   }
])

export default routes;