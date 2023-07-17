const serverURL = "http://localhost:3000";

export async function loginRequest(username, password) {
  const path = "/users/login";
  const res = await fetch(serverURL + path, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const message = res.json();
  return [res.ok, message];
}

export async function logoutRequest() {
  const path = "/users/logout";
  const res = await fetch(serverURL + path, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const message = res.json();
  return [res.ok, message];
}

export async function signupRequest(name, username, email, data, password) {
  const path = "/users/signup";
  const res = await fetch(serverURL + path, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      username: username,
      email: email,
      data: data,
      password: password,
    }),
  });
  const message = res.json();

  return [res.ok, message];
}

export async function isLoggedIn() {
  const path = "/users";
  const res = await fetch(serverURL + path, {
    method: "GET",
    credentials: "include",
  });
  const message = await res.json();
  console.log(res.ok, message);
  return [res.ok, message.data];
}

export async function generateClientCredentialsRequest() {
  const path = "/client/register";
  const res = await fetch(serverURL + path, {
    method: "POST",
  });
  const credentials = await res.json();
  console.log(res.ok, credentials);
  return [res.ok, credentials];
}

export async function approveRequest() {
  const path = "/oauth/approve";
  const res = await fetch(serverURL + path, {
    method: "POST",
  });
  const credentials = await res.json();
  console.log(res.ok, credentials);
  return [res.ok, credentials];
}

export async function rejectRequest() {
  const path = "/oauth/denied";
  const res = await fetch(serverURL + path, {
    method: "POST",
  });
  const credentials = await res.json();
  console.log(res.ok, credentials);
  return [res.ok, credentials];
}
