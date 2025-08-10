import { createBrowserRouter } from "react-router";

import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import Profile from "../pages/Profile";
import About from "../pages/About";
import AddFood from "../pages/donorPages/addFood";
import AvailableFood from "../pages/AvailableFood";
import ManageDonorPost from "../pages/donorPages/ManageDonorPost";
import UpdateDonorPost from "../pages/donorPages/UpdateDonorPost";
// import UserFoodRequest from "../pages/userPages/MyFoodRequests";
import MyFoodRequests from "../pages/userPages/MyFoodRequests";
import ReqManage from "../pages/donorPages/ReqManage";
import PrivateRoute from "./PrivateRoute";
// import Details from "../pages/FoodDetails";
import FoodDetails from "../pages/FoodDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "available-foods",
        element: (
          // <PrivateRoute>
            <AvailableFood />
          // </PrivateRoute>
        ),
      },
      {
        path: "manage-my-food/",
        element: <ManageDonorPost />,
      },
      {
        path: "update-donor-post/:id",
        element: (
          <PrivateRoute>
            <UpdateDonorPost />
          </PrivateRoute>
        ),
      },
      {
        path: "my-food-req",
        element: (
          <PrivateRoute>
            <MyFoodRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "req-manage",
        element: (
          <PrivateRoute>
            <ReqManage />
          </PrivateRoute>
        ),
      },
      {
        path: "food-details/:id",
        element: (
          // <PrivateRoute>
            <FoodDetails />
          // </PrivateRoute>
        ),
      },
    ],
  },
]);
