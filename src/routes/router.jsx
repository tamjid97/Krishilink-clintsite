import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Error404 from "../pages/Error404";
import Register from "../Components/Register/Register";
import Login from "../Components/Register/Login";
import HomeMain from "../Components/Home/HomeMain";
import MyProfile from "../pages/MyProfile";

import PrivateRoute from "./PrivateRoute";
import AllCrops from "../Components/Home/AllCrops/AllCrops";
import PopCrops from "../Components/Home/AllCrops/PopCrops";
import ViewDetala from "../Components/Home/DetailsPage/ViewDetala";
import MyInterest from "../Components/mu innterest/MyInterest";
import Addcrops from "../Components/AddCrops/Addcrops";
import Mypost from "../Components/AddCrops/Mypost";

// Example loggedInUser
const loggedInUser = { email: "user@gmail.com", name: "Rahim" };

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <HomeMain /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "profile", element: <MyProfile /> },
      { path: "all-crops", element: <AllCrops /> },
      { path: "pop-crops", element: <PopCrops /> },
      { path: "MyInterest", element: <MyInterest /> },
      { path: "AddCrops", element: <Addcrops /> },
      { path: "Mypost", element: <Mypost /> },

      {
        path: "crops/:id",
        loader: ({ params }) =>
          fetch(
            `https://smart-deals-api-server-sepia-xi.vercel.app/crops/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <ViewDetala loggedInUser={loggedInUser} />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "*", element: <Error404 /> },
]);

export default router;
