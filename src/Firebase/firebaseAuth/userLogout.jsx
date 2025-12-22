import { auth } from "../firebase";

// Logout users from the website
export const userLogout = () => {
  auth
    .signOut()
    .then(() => {
      window.location.reload();
      localStorage.clear();
    })
    .catch((err) => console.log(err));
};
