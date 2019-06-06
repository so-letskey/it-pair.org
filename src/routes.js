import WelcomePage from "./components/WelcomePage.vue";
import MainPage from "./components/MainPage";
import AdvertDescription from "./components/AdvertList/AdvertDescription";

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
  }
];
