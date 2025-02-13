import { createBrowserRouter } from "react-router-dom";
//import Home from "../pages/Home.jsx";
import { lazy } from "react";
const Home = lazy(() => import("../pages/Home.jsx"));
//import Add from "../pages/Add.jsx";
const Add = lazy(() => import("../pages/Add.jsx"));
//import Edit from "../pages/Edit.jsx";
const Edit = lazy(() => import("../pages/Edit.jsx"));
//import Login from "../pages/Login.jsx";
const Login = lazy(() => import("../pages/Login.jsx"));
//import Register from "../pages/Register.jsx";
const Register = lazy(() => import("../pages/Register.jsx"));
//import NotAllowed from "../pages/NotAllowed.jsx";
const NotAllowed = lazy(() => import("../pages/NotAllowed.jsx"));
import Layout from "../components/Layout.jsx";
import AdminPage from "../components/AdminLayout.jsx";
import ModOrAdmin from "../pages/ModOrAdminPage.jsx";
import UserProfilePage from "../pages/UserProfilePage.jsx";
import UserPage from "../pages/UserPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      ,
      {
        path: "/Edit/:id",
        element: (
          <ModOrAdmin>
            <Edit />
          </ModOrAdmin>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/notallowed",
        element: <NotAllowed />,
      },
      {
        path: "/userprofile",
        element: (
          <UserPage>
            <UserProfilePage />
          </UserPage>
        ),
      },
    ],
  },
  {
    path: "/dasboard",
    element: <div>Admin</div>,
    children: [
      {
        path: "user",
        element: <div>Dasboard Admin</div>,
      },
    ],
  },
]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <Navbar />
//       <RouterProvider router={router} />
//     </AuthProvider>
//   </React.StrictMode>
// );
export default router;
