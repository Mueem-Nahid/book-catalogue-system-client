import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import HomePage from "../pages/homePage.tsx";
import LoginPage from "../pages/loginPage.tsx";
import SignupPage from "../pages/signupPage.tsx";
import AllBook from "../pages/allBook.tsx";
import BookDetailsPage from "../pages/bookDetailsPage.tsx";
import {NotFound} from "../pages/404.tsx";
import AddBookPage from "../pages/addBookPage.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import EditBookPage from "../pages/editBookPage.tsx";
import MyWishListPage from "../pages/myWishListPage.tsx";

const routes = createBrowserRouter([
   {
      path: '/',
      element: <App/>,
      children: [
         {
            index: true,
            element: <HomePage/>
         },
         {
            path: '/all-books',
            element: <AllBook/>,
         },
         {
            path: '/book/:id',
            element: <BookDetailsPage/>,
         },
         {
            path: '/add-book',
            element:
               <PrivateRoute>
                  <AddBookPage/>
               </PrivateRoute>,
         },
         {
            path: '/edit-book/:id',
            element:
               <PrivateRoute>
                  <EditBookPage/>
               </PrivateRoute>,
         },
         {
            path: '/my-wishlist',
            element:
               <PrivateRoute>
                  <MyWishListPage/>
               </PrivateRoute>,
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
            path: '*',
            element: <NotFound/>,
         },
      ]
   },
])

export default routes;