import { createBrowserRouter } from "react-router";
import App from "../App";
import MainLayout from "../Layout/MainLayout";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import DashboardLayout from "../Dashboard/DashboardLayout";
import CreateStudySession from "../Dashboard/Tutor/CreateStudySession ";
import AllStudySession from "../Pages/AllStudySession";
import SessionDetails from "../Pages/SessionDetails ";
import BookedSessions from "../Dashboard/Student/BookedSessions ";
import SessionDetailsWithReview from "../Dashboard/Student/SessionDetailsWithReview ";
import CreateNote from "../Dashboard/Student/CreateNote ";
import ManageNotes from "../Dashboard/Student/ManageNotes ";
import MyStudySessions from "../Dashboard/Tutor/MyStudySessions ";
import UploadMaterials from "../Dashboard/Tutor/UploadMaterials ";
import ViewMaterials from "../Dashboard/Tutor/ViewMaterials";
import StudentMaterials from "../Dashboard/Student/StudentMaterials";
import AllUsers from "../Dashboard/Admin/AllUsers";

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
        path: "allUsers",
        element: <AllUsers />,
      },
      {
        path: "createStudy",
        element: <CreateStudySession />,
      },
      {
        path: "upload-materials",
        element: <UploadMaterials />,
      },
      {
        path: "view-materials",
        element: <ViewMaterials />,
      },
      // student
      {
        path: "booked-sessions",
        element: <BookedSessions></BookedSessions>,
      },
      {
        path: "booked-sessions/:id",
        element: <SessionDetailsWithReview />,
      },
      {
        path: "create-note",
        element: <CreateNote />,
      },
      {
        path: "personal-notes",
        element: <ManageNotes />,
      },
      {
        path: "my-study-sessions",
        element: <MyStudySessions />,
      },
      {
        path: "view-student-materials",
        element: <StudentMaterials />,
      },
    ],
  },
]);
