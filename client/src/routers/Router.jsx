import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Index";
import Cart from "../pages/Cart/Index";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import UpdateProfile from "../pages/Setting/index";
import ProtectPage from "../pages/ProtectPage/Index";
import DashBoardLayout from "../layouts/DashBoardLayout";
import Dashboard from "../pages/Dashboard/Index";
import AddProduct from "../pages/AddProduct/Index";
import ManageItems from "../pages/ManageItems/Index"; 
import Profile from "../pages/Profile/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
     
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: (
          <ProtectPage>
            <Cart />
          </ProtectPage>
        ),
      },
      {
        path: "/updateprofile",
        element: (
          <ProtectPage>
            <UpdateProfile />
          </ProtectPage>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectPage>
            <Profile />
          </ProtectPage>
        ),
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard/>,
      },
      {
        path: "add-product",
        element: <AddProduct/>,
      },
       {
        path: "manage-items",
        element: <ManageItems/>,
      }
    ]
      
  }
]);

export default router;
