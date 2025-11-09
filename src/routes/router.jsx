import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Error404 from "../pages/Error404";
import Register from "../Components/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default router;
