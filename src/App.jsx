import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Root from "./routes/Root";
import Home from "./pages/home/components/Home"
import CreateAccount from './pages/createAccount/components/CreateAccount'
import { ToastContainer} from 'react-toastify';  // npm i react-toastify
import 'react-toastify/dist/ReactToastify.css';
import SignIn from './pages/signIn/components/SignIn'
import ProtectedRoutes from './auth/protectedRoutes/components/ProtectedRoutes'
import UserContextProvider from './context/User'
import CategoryProducts from './pages/CategoryProducts/components/CategoryProducts'
import ProductDetails from './pages/productDetails/components/ProductDetails'
import ShoppingCart from "./pages/cart/components/ShoppingCart";
import Order from "./pages/order/components/Order";
import SendCode from "./pages/sendCode/components/SendCode";
import ForgotPassword from "./pages/forgotPassword/components/ForgotPassword";
import NestedRoot from './routes/nestedRoot/NestedRoot'
import Profile from './pages/nestedNav/components/profile/Profile'
import Contact from './pages/nestedNav/components/contact/Contact'
import UserOrder from './pages/nestedNav/components/userOrder/UserOrder'

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element:  <Root/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/category/:name/:id",
          element: <CategoryProducts />,
        },
        {
          path: "/product/:id",
          element: <ProductDetails />,
        },
        {
          path: "/createAccount",
          element: <CreateAccount />,
        },
        {
          path: "/signIn",
          element: <SignIn/>,
        },
        {
          path: "/cart",
          element: 
          <ProtectedRoutes>
          <ShoppingCart/>
          </ProtectedRoutes>
        },

        {
          path: "/order",
          element: 
          <ProtectedRoutes>
          <Order/>
          </ProtectedRoutes>
        },

        {
          path: "/sendCode",
          element: <SendCode/>
        },
        {
          path: "/forgotPassword",
          element: <ForgotPassword/>
        },

        
        {
          path: "/profile",
          element: 
          <ProtectedRoutes>
          <NestedRoot/>
          </ProtectedRoutes>,
          children: [
            {
              path: "", 
              element: <Profile/>
            },
            {
              path: "contact",  
              element: <Contact/>
            },
            {
              path: "userOrder", 
              element: <UserOrder/>
            },
          ],
        },
      ]
    },
  ]);

  return (
    <>
        <UserContextProvider>
        <RouterProvider router={router} />
        </UserContextProvider>
        <ToastContainer className="toast-container" />
        </>
  )
}
