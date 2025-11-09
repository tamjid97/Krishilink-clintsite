import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Error404 from "../pages/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      }
  
    ]

  },
      {
        path:"*",
        element: <Error404/>
      },
]);

<RouterProvider router={router} />;
export default router;