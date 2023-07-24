import { login } from "./Components/login.js";
import { showData } from "./Components/showData.js";
import { showDataRequest } from "./requests.js";

const root = document.getElementById("root");

// showDataRequest().then((data) => showData(root, data));

showDataRequest().then((response) => {
  if (response[0]) {
    showData(root, response[1]);
  } else {
    login(root);
  }
});
