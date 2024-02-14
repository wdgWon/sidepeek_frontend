import { Outlet, createBrowserRouter } from "react-router-dom"

import ErrorPage from "@pages/ErrorPage/ErrorPage"
import HomePage from "@pages/HomePage/HomePage"
import LoginPage from "@pages/LoginPage/LoginPage"
import ProfilePage from "@pages/ProfilePage/ProfilePage"
import ProjectDetailPage from "@pages/ProjectDetailPage/ProjectDetailPage"
import ProjectEditPage from "@pages/ProjectEditPage/ProjectEditPage"
import ProjectListPage from "@pages/ProjectListPage/ProjectListPage"
import SignUpPage from "@pages/SignUpPage/SignUpPage"
import TestPage from "@pages/TestPage/TestPage"

export const router = createBrowserRouter([
  {
    element: (
      <>
        {/* <Header /> */}
        <Outlet />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: "/project",
        element: <ProjectListPage />,
        children: [
          {
            path: ":projectId",
            element: <ProjectDetailPage />,
          },
          {
            path: ":projectId/edit",
            element: <ProjectEditPage />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/test",
        element: <TestPage />,
      },
    ],
  },

  {
    path: "/profile/:userId",
    element: <ProfilePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
])
