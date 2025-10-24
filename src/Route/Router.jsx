import { createBrowserRouter } from "react-router";
import App from "../App";
import MainLayout from "../Layout/MainLayout";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import DashboardLayout from "../Dashboard/DashboardLayout";
import CreateStudySession from "../Dashboard/Tutor/CreateStudySession";
import AllStudySession from "../Pages/AllStudySession";
import SessionDetails from "../Pages/SessionDetails";
import BookedSessions from "../Dashboard/Student/BookedSessions";
import SessionDetailsWithReview from "../Dashboard/Student/SessionDetailsWithReview";
import CreateNote from "../Dashboard/Student/CreateNote";
import ManageNotes from "../Dashboard/Student/ManageNotes";
import MyStudySessions from "../Dashboard/Tutor/MyStudySessions";
import UploadMaterials from "../Dashboard/Tutor/UploadMaterials";
import ViewMaterials from "../Dashboard/Tutor/ViewMaterials";
import StudentMaterials from "../Dashboard/Student/StudentMaterials";
import AllUsers from "../Dashboard/Admin/AllUsers";
import AdminStudySessions from "../Dashboard/Admin/AdminStudySessions";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import TutorRoute from "./TutorRoute";
import StudentRoute from "./StudentRoute";
import Home from "../Pages/homePage/Home";
import AdminAllMaterials from "../Dashboard/Admin/AdminAllMaterials";
import Payment from "../Pages/Payment/Payment";
import DashboardHome from "../Dashboard/DashboardHome";
import AllTutorPage from "../Pages/AllTutorPage";
import ErrorPage from "../Pages/ErrorPage";
import Profile from "../Dashboard/Profile";

/**
 * Application router configuration
 * 
 * Defines all routes for the application including public routes,
 * authenticated routes, and role-specific dashboard routes.
 * 
 * @type {Object}
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-study-session",
        element: <AllStudySession />,
      },
      {
        path: "/session/:id",
        element: (
          <PrivateRoute>
            <SessionDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/session-payment/:id",
        element: <Payment />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/all-tutor-page",
        element: <AllTutorPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      // Admin routes
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-study-sessions",
        element: (
          <AdminRoute>
            <AdminStudySessions />
          </AdminRoute>
        ),
      },
      {
        path: "admin-all-materials",
        element: (
          <AdminRoute>
            <AdminAllMaterials />
          </AdminRoute>
        ),
      },
      // Tutor routes
      {
        path: "createStudy",
        element: (
          <TutorRoute>
            <CreateStudySession />
          </TutorRoute>
        ),
      },
      {
        path: "upload-materials",
        element: (
          <TutorRoute>
            <UploadMaterials />
          </TutorRoute>
        ),
      },
      {
        path: "view-materials",
        element: (
          <TutorRoute>
            <ViewMaterials />
          </TutorRoute>
        ),
      },
      {
        path: "my-study-sessions",
        element: (
          <TutorRoute>
            <MyStudySessions />
          </TutorRoute>
        ),
      },
      // Student routes
      {
        path: "booked-sessions",
        element: (
          <StudentRoute>
            <BookedSessions />
          </StudentRoute>
        ),
      },
      {
        path: "booked-sessions/:id",
        element: (
          <StudentRoute>
            <SessionDetailsWithReview />
          </StudentRoute>
        ),
      },
      {
        path: "create-note",
        element: (
          <StudentRoute>
            <CreateNote />
          </StudentRoute>
        ),
      },
      {
        path: "personal-notes",
        element: (
          <StudentRoute>
            <ManageNotes />
          </StudentRoute>
        ),
      },
      {
        path: "view-student-materials",
        element: (
          <StudentRoute>
            <StudentMaterials />
          </StudentRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);