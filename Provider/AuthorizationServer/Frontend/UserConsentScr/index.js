import { login } from "./Components/login.js";
import { consentPage } from "./Components/consentPage.js";
import { isLoggedIn } from "./requests.js";

const root = document.getElementById("root");

// showDataRequest().then((data) => showData(root, data));

isLoggedIn().then((response) => {
  if (response[0]) {
    consentPage(root);
  } else {
    login(root);
  }
});
