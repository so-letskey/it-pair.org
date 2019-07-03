import WelcomePage from "../components/WelcomePage.vue";
import MainPage from "../components/MainPage";
import AdvertDescription from "../components/Adverts/AdvertList/AdvertDescription";
import AdvertAdditionForm from "../components/Adverts/AdvertOperations/AdvertAdditionForm";
import AdvertModification from "../components/Adverts/AdvertOperations/AdvertModification";
import AdvertFiltering from "../components/Adverts/AdvertList/AdvertFiltering";
import UserSignUp from "../components/UserManagement/UserSignUp";
import UserSignIn from "../components/UserManagement/UserSignIn";
import ProfileDetails from "../components/UserManagement/ProfileDetails";
import ProfileModification from "../components/UserManagement/ProfileModification";
import AuthGuard from "./auth-guard";

export const routes = [
  { name: "welcomePage", path: "", component: WelcomePage },
  {
    name: "advertFiltering",
    path: "/filtering",
    component: AdvertFiltering
  },
  {
    name: "advertsList",
    path: "/adverts",
    component: MainPage
  },
  {
    name: "advertDescription",
    path: "/adverts/:id",
    component: AdvertDescription
  },
  {
    name: "advertAddition",
    path: "/add",
    component: AdvertAdditionForm,
    beforeEnter: AuthGuard
  },
  {
    name: "advertModification",
    path: "/adverts/modify",
    component: AdvertModification,
    props: true
  },
  { name: "profileDetails", path: "/profile/:id", component: ProfileDetails },
  {
    name: "profileModification",
    path: "/profile/edit",
    component: ProfileModification,
    props: true
  },
  { name: "userSignUp", path: "/signup", component: UserSignUp },
  { name: "userSignIn", path: "/signin", component: UserSignIn }
];
