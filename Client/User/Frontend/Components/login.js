import { loginRequest, showDataRequest } from "../requests.js";
import { showData } from "./showData.js";
import { signUp } from "./signup.js";

export function login(root) {
  root.innerHTML = "";

  const loginDiv = document.createElement("div");
  const username = document.createElement("input");
  const password = document.createElement("input");
  const loginBtn = document.createElement("button");
  const signupBtn = document.createElement("button");
  const googleBtn = document.createElement("button");

  username.type = "text";
  username.placeholder = "Username";
  password.type = "password";
  password.placeholder = "Password";
  loginBtn.textContent = "Log In";
  signupBtn.textContent = "SignUp";
  googleBtn.textContent = "Login With My Auth Provider";

  loginDiv.append(username, password, loginBtn, signupBtn, googleBtn);
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
  googleBtn.addEventListener("click", () => {});

  root.append(loginDiv);
}
