import { logoutRequest } from "../requests.js";
import { login } from "./login.js";

export function showData(root, data) {
  root.innerHTML = "";
  const showData = document.createElement("div");
  const dataHeader = document.createElement("h1");
  dataHeader.textContent = "do you wish to consent?";
  const consentBtn = document.createElement("button");
  const rejectBtn = document.createElement("button");

  const logOutBtn = document.createElement("button");

  logOutBtn.textContent = "LogOut Button";

  showData.append(dataHeader, logOutBtn);
  root.append(showData);
  consentBtn.addEventListener("click", (e) => {});
  rejectBtn.addEventListener("click", (e) => {});

  logOutBtn.addEventListener("click", (e) => {
    logoutRequest().then((res) => {
      login(root);
    });
  });
}
