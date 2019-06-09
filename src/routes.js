import WelcomePage from "./components/WelcomePage.vue";
import MainPage from "./components/MainPage";
import AdvertDescription from "./components/AdvertList/AdvertDescription";
import AdvertAddition from "./components/AdvertList/AdvertAddition";

export const routes = [
  { path: "", component: WelcomePage },
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
    component: AdvertAddition
  }
];
