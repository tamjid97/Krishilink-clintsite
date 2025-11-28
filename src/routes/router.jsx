import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Error404 from "../pages/Error404";
import Register from "../Components/Register/Register";
import Login from "../Components/Register/Login";
import HomeMain from "../Components/Home/HomeMain";
import MyProfile from "../pages/MyProfile";
import ViewDetails from "../Components/Home/DetailsPage/ViewDetails";
import PrivateRoute from "./PrivateRoute";
import AllCrops from "../Components/Home/AllCrops/AllCrops";
import PopCrops from "../Components/Home/AllCrops/PopCrops";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomeMain />,
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
        element: <MyProfile />,
      },
      {
        path: "AllCrops",
        element: <AllCrops />,
      },
      {
        path: "PopCrops",
        element: <PopCrops/>,
      },
      {
        path: "ViewDetails",
        element: (
          <PrivateRoute>
            <ViewDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default router;
