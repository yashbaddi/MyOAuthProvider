import { signupRequest } from "../requests.js";
import { login } from "./login.js";

export function signUp(root) {
  root.innerHTML = "";
  const signUpDiv = document.createElement("div");

  const username = document.createElement("input");
  const password = document.createElement("input");
  const data = document.createElement("input");
  const signupBtn = document.createElement("button");
  const loginBtn = document.createElement("button");

  username.type = "text";
  username.placeholder = "Username";
  password.type = "password";
  password.placeholder = "password";
  data.type = "text";
  data.placeholder = "Data";
  signupBtn.textContent = "Sign Up";
  loginBtn.textContent = "Log Up";

  signupBtn.addEventListener("click", async (e) => {
    signupRequest(username.value, password.value, data.value).then(
      (response) => {
        if (response[0]) {
          login(root);
        }
      }
    );
  });

  loginBtn.addEventListener("click", (e) => {
    login(root);
  });

  signUpDiv.append(username, password, data, signupBtn);
  root.append(signUpDiv);
}
