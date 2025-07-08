import { createBrowserRouter } from "react-router";
import App from "../App";
import MainLayout from "../Layout/MainLayout";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import DashboardLayout from "../Dashboard/DashboardLayout";
import CreateStudySession from "../Dashboard/Tutor/CreateStudySession ";
import AllStudySession from "../Pages/AllStudySession";
import SessionDetails from "../Pages/SessionDetails ";

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
        path: "/all-study-session",
        Component: AllStudySession,
      },
      {
        path: "/session/:id",
        Component: SessionDetails,
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
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "createStudy",
        element: <CreateStudySession />,
      },
    ],
  },
]);
