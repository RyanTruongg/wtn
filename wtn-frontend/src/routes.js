import React, { lazy } from "react";
import { Redirect } from "react-router-dom";

import AuthLayout from "./layouts/Auth";
import ErrorLayout from "./layouts/Error";
import DashboardLayout from "./layouts/Dashboard";
import AdminLayout from "./layouts/Admin";
import InstructorLayout from "./layouts/Instructor";
import StudentLayout from "./layouts/Student";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/classroom/home" />,
  },

  {
    path: "/auth",
    component: AuthLayout,
    routes: [
      {
        path: "/auth/login",
        exact: true,
        component: lazy(() => import("views/Login")),
      },
      {
        path: "/auth/register",
        exact: true,
        component: lazy(() => import("views/Register")),
      },
      {
        path: "/auth/forgot-password",
        exact: true,
        component: lazy(() => import("views/ForgotPassword")),
      },
      {
        path: "/auth/recovery/:token",
        exact: true,
        component: lazy(() => import("views/RecoveryPassword")),
      },
      {
        path: "/auth/classroom/login",
        exact: true,
        component: lazy(() => import("views/ClassroomLogin")),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },

  {
    path: "/errors",
    component: ErrorLayout,
    routes: [
      {
        path: "/errors/error-401",
        exact: true,
        component: lazy(() => import("views/Error401")),
      },
      {
        path: "/errors/error-404",
        exact: true,
        component: lazy(() => import("views/Error404")),
      },
      {
        path: "/errors/error-500",
        exact: true,
        component: lazy(() => import("views/Error500")),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    routes: [
      {
        path: "/admin",
        exact: true,
        component: () => <Redirect to="/admin/accounts" />,
      },
      {
        path: "/admin/accounts",
        exact: true,
        component: lazy(() => import("views/_AdminViews_/Accounts")),
      },

      {
        path: "/admin/accounts/:id",
        exact: true,
        component: lazy(() => import("views/_AdminViews_/AccountDetails")),
      },

      {
        path: "/admin/subjects",
        exact: true,
        component: lazy(() => import("views/_AdminViews_/Subjects")),
      },

      {
        path: "/admin/subjects/:id",
        exact: true,
        component: lazy(() => import("views/_AdminViews_/SubjectDetails")),
      },

      {
        path: "/admin/courses",
        exact: true,
        component: lazy(() => import("views/_AdminViews_/Courses")),
      },

      {
        path: "/admin/courses/:id",
        exact: true,
        component: lazy(() => import("views/_AdminViews_/CourseDetails")),
      },

      {
        path: "/admin/courses/:id/:tab",
        exact: true,
        component: lazy(() => import("views/_AdminViews_/CourseDetails")),
      },
    ],
  },
  {
    path: "/instructor",
    component: InstructorLayout,
    routes: [
      {
        path: "/instructor",
        exact: true,
        component: () => <Redirect to="/instructor/questions" />,
      },
      {
        path: "/instructor/questions",
        exact: true,
        component: lazy(() => import("views/_InstructorViews_/Questions")),
      },

      {
        path: "/instructor/courses",
        exact: true,
        component: lazy(() => import("views/_InstructorViews_/Courses")),
      },

      {
        path: "/instructor/courses/:id",
        exact: true,
        component: lazy(() => import("views/_InstructorViews_/CourseDetails")),
      },

      {
        path: "/instructor/courses/:id/:tab",
        exact: true,
        component: lazy(() => import("views/_InstructorViews_/CourseDetails")),
      },

      {
        path: "/instructor/test-details/:id",
        exact: true,
        component: lazy(() => import("views/_InstructorViews_/TestDetails")),
      },

      {
        path: "/instructor/test-details/:id/:tab",
        exact: true,
        component: lazy(() => import("views/_InstructorViews_/TestDetails")),
      },
    ],
  },

  {
    path: "/student",
    component: StudentLayout,
    routes: [
      {
        path: "/student",
        exact: true,
        component: () => <Redirect to="/student/courses" />,
      },
      {
        path: "/student/courses",
        exact: true,
        component: lazy(() => import("views/_StudentViews_/Courses")),
      },

      {
        path: "/student/courses/:id",
        exact: true,
        component: lazy(() => import("views/_StudentViews_/CourseDetails")),
      },

      {
        path: "/student/courses/:id/:tab",
        exact: true,
        component: lazy(() => import("views/_StudentViews_/CourseDetails")),
      },

      {
        path: "/student/online-test/:testId",
        exact: true,
        component: lazy(() => import("views/_StudentViews_/OnlineTest")),
      },
    ],
  },
  {
    route: "*",
    component: DashboardLayout,
    routes: [],
  },
];

export default routes;
