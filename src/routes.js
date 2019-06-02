import WelcomePage from './components/WelcomePage.vue';
import MainPage from './components/MainPage';

export const routes = [
    { path: '', component: WelcomePage },
    { path: '/app', component: MainPage }
];
