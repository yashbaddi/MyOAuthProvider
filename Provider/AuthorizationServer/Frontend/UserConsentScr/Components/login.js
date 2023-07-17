import {
  generateClientCredentialsRequest,
  loginRequest,
  showDataRequest,
} from "../requests.js";
import { clientCredentials } from "./clientCredentials.js";
import { showData } from "./showData.js";
import { signUp } from "./signup.js";

export function login(root) {
  root.innerHTML = "";

  const loginDiv = document.createElement("div");
  const username = document.createElement("input");
  const password = document.createElement("input");
  const loginBtn = document.createElement("button");
  const signupBtn = document.createElement("button");
  const genClientBtn = document.createElement("button");

  username.type = "text";
  username.placeholder = "Username";
  password.type = "password";
  password.placeholder = "Password";
  loginBtn.textContent = "Log In";
  signupBtn.textContent = "SignUp";
  genClientBtn.textContent = "Generate Client Credentails";

  loginDiv.append(username, password, loginBtn, signupBtn, genClientBtn);
  loginBtn.addEventListener("click", (e) => {
    loginRequest(username.value, password.value).then((response) => {
      if (response[0]) {
        showDataRequest().then((res) => {
          if (res[0]) {
            showData(root, res[1]);
          }
        });
      }
    });
  });
  signupBtn.addEventListener("click", (e) => {
    console.log("signup clicked");
    signUp(root);
  });
  genClientBtn.addEventListener("click", () => {
    generateClientCredentialsRequest().then((res) => {
      clientCredentials(root, res);
    });
  });

  root.append(loginDiv);
}
