// @material-ui/icons
import Person from "@material-ui/icons/Person";
import UsersPage from "views/UserManagement.jsx";
import SettingsPage from "views/Settings.jsx";
import Settings from "@material-ui/icons/Settings";


const dashboardRoutes = [
  {
    path: "/overview",
    sidebarName: "Overview",
    navbarName: "Overview",
    icon: Person,
    component: UsersPage
  },
  {
    path: "/question-management",
    sidebarName: "Question Management",
    navbarName: "Question Management",
    icon: Person,
    component: UsersPage
  },
  {
    path: "/test-groups",
    sidebarName: "Test Management",
    navbarName: "Test Management",
    icon: Person,
    component: UsersPage
  },
  {
    path: "/user-management",
    sidebarName: "User Management",
    navbarName: "User Management",
    icon: Person,
    component: UsersPage
  },
  {
    path: "/content-usage",
    sidebarName: "Content Usage",
    navbarName: "Content Usage",
    icon: Person,
    component: UsersPage
  },
  {
    path: "/courses",
    sidebarName: "Course Management",
    navbarName: "Course Management",
    icon: Person,
    component: UsersPage
  },
  {
    path: "/settings",
    sidebarName: "Settings",
    navbarName: "Settings",
    icon: Settings,
    component: SettingsPage
  },

  { redirect: true, path: "/dashboard", to: "/user-management", navbarName: "Redirect" }
];

export default dashboardRoutes;