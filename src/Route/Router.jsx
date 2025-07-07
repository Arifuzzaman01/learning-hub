import { createBrowserRouter } from "react-router";
import App from "../App";
import MainLayout from "../Layout/MainLayout";
import Login from "../authentication/Login";
import Register from "../authentication/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: App,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
