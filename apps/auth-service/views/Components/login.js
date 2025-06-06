import { loginRequest, isLoggedIn } from "../requests.js";
import { clientCredentialsForm } from "./clientCredentailsForm.js";
import { consentPage } from "./consentPage.js";
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
  loginBtn.addEventListener("click", () => {
    loginRequest(username.value, password.value).then((response) => {
      if (response[0]) {
        isLoggedIn().then((res) => {
          if (res[0]) {
            consentPage(root, res[1]);
          }
        });
      }
    });
  });
  signupBtn.addEventListener("click", () => {
    console.log("signup clicked");
    signUp(root);
  });
  genClientBtn.addEventListener("click", () => {
    clientCredentialsForm(root);
  });

  root.append(loginDiv);
}
