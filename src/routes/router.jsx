import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";

import Error404 from "../pages/Error404";
import Register from "../Components/Register/Register";
import Login from "../Components/Register/Login";
import HomeMain from "../Components/Home/HomeMain";
import MyProile from "../pages/MyProile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomeMain/>
      },    
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <MyProile/>,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default router;
