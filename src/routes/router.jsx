import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Error404 from "../pages/Error404";
import Register from "../Components/Register/Register";
import Login from "../Components/Register/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login/> }

    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default router;
