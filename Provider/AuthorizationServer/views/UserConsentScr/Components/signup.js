import { signupRequest } from "../UserConsentScr/requests.js";
import { login } from "./login.js";

export function signUp(root) {
  root.innerHTML = "";
  const signUpDiv = document.createElement("div");

  const username = document.createElement("input");
  const name = document.createElement("input");
  const email = document.createElement("input");
  const data = document.createElement("input");
  const password = document.createElement("input");

  const signupBtn = document.createElement("button");
  const loginBtn = document.createElement("button");

  username.type = "text";
  username.placeholder = "Username";

  password.type = "password";
  password.placeholder = "password";

  name.type = "text";
  name.placeholder = "Name";

  email.type = "text";
  email.placeholder = "Email";

  data.type = "text";
  data.placeholder = "Data";

  signupBtn.textContent = "Sign Up";
  loginBtn.textContent = "Log In";

  signupBtn.addEventListener("click", async (e) => {
    signupRequest(
      name.value,
      username.value,
      email.value,
      data.value,
      password.value
    ).then((response) => {
      if (response[0]) {
        login(root);
      }
    });
  });

  loginBtn.addEventListener("click", (e) => {
    login(root);
  });

  signUpDiv.append(name, username, email, data, password, signupBtn);
  root.append(signUpDiv);
}
