// @material-ui/icons
import Person from "@material-ui/icons/Person";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import UsersPage from "views/UserManagement.jsx";
import Template from "views/Template.jsx";
import QuestionFolder from "views/QuestionFolderManagement.jsx";
import SettingsPage from "views/Settings.jsx";
import Settings from "@material-ui/icons/Settings";
import TopicManagement from "views/TopicManagement.jsx";
import TestFolder from "views/TestFolderManagement.jsx";
import QuestionManagementFolder from "views/QuestionFolderSelect.jsx";
import QuestionManagement from "views/QuestionManagement.jsx";
// import {folder_name} from ""

const dashboardRoutes = [
  {
    path: "/adminpanel/overview/",
    sidebarName: "Overview",
    navbarName: "Overview",
    icon: Person,
    component: Template,
    type:"view"
  },
  {
    path: "/adminpanel/question-management/subfolder/",
    sidebarName: "Question Management",
    navbarName: "Question Management > Folder",
    icon: QuestionAnswer,
    component: QuestionManagement,
    type:"subview"
  },
  {
    path: "/adminpanel/question-management/",
    sidebarName: "Question Management",
    navbarName: "Question Management",
    icon: QuestionAnswer,
    component: QuestionManagementFolder,
    type:"view"
  },
  // {
  //   path: "/adminpanel/test-groups",
  //   sidebarName: "Test Management",
  //   navbarName: "Test Management",
  //   icon: Person,
  //   component: UsersPage,
  //   type:"view"
  // },
  {
    path: "/adminpanel/user-management",
    sidebarName: "User Management",
    navbarName: "User Management",
    icon: Person,
    component: UsersPage,
    type:"view"
  },
  // {
  //   path: "/adminpanel/content-usage",
  //   sidebarName: "Content Usage",
  //   navbarName: "Content Usage",
  //   icon: Person,
  //   component: UsersPage,
  //   type:"view"
  // },
  // {
  //   path: "/adminpanel/courses",
  //   sidebarName: "Course Management",
  //   navbarName: "Course Management",
  //   icon: Person,
  //   component: UsersPage,
  //   type:"view"
  // },  

  {
    path: "/adminpanel/settings/topicmanagement/",
    sidebarName: "Settings",
    navbarName: "Settings > Topic Management",
    icon: Settings,
    component: TopicManagement,
    type:"subview"
  },


  {
    path: "/adminpanel/settings/users/",
    sidebarName: "Settings",
    navbarName: "Settings > Users",
    icon: Settings,
    component: UsersPage,
    type:"subview"
  },

  {
    path: "/adminpanel/settings/questionfolder/",
    sidebarName: "Settings",
    navbarName: "Settings > Question Folder Management",
    icon: Settings,
    component: QuestionFolder,
    type:"subview"
  },
  {
    path: "/adminpanel/settings/testfolder/",
    sidebarName: "Settings",
    navbarName: "Settings > Test Folder Management",
    icon: Settings,
    component: TestFolder,
    type:"subview"
  },


  {
    path: "/adminpanel/settings/",
    sidebarName: "Settings",
    navbarName: "Settings",
    icon: Settings,
    component: SettingsPage,
    type:"view"
  },

  { redirect: true, path: "/adminpanel", to: "/adminpanel/overview", navbarName: "Redirect" }
];

export default dashboardRoutes;
