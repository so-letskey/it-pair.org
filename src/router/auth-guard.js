import { store } from "../store/store";

export default (to, from, next) => {
  if (store.state.userDataModule.activeUser) {
    next();
  } else {
    next("/signin");
  }
};
