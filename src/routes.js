import WelcomePage from "./components/WelcomePage.vue";
import MainPage from "./components/MainPage";
import AdvertDescription from "./components/AdvertList/AdvertDescription";
import AdvertAdditionForm from "./components/AdvertAddition/AdvertAdditionForm";
import UserSignUp from "./components/UserManagement/UserSignUp";
import UserSignIn from "./components/UserManagement/UserSignIn";

export const routes = [
  { name: "welcomePage", path: "", component: WelcomePage },
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
    component: AdvertAdditionForm
  },
  { name: "userSignUp", path: "/signup", component: UserSignUp },
  { name: "userSignIn", path: "/signin", component: UserSignIn }
];
