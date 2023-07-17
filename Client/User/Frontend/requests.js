const serverURL = "http://127.0.0.1:8000";

export async function loginRequest(username, password) {
  const path = "/login";
  const res = await fetch(serverURL + path, {
    method: "POST",
    mode: "cors",
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
  const path = "/logout";
  const res = await fetch(serverURL + path, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const message = res.json();
  return [res.ok, message];
}

export async function signupRequest(username, password, data) {
  const path = "/signup";
  const res = await fetch(serverURL + path, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      data: data,
    }),
  });
  const message = res.json();

  return [res.ok, message];
}

export async function showDataRequest() {
  const path = "/";
  const res = await fetch(serverURL + path, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  const message = await res.json();
  console.log(res.ok, message);
  return [res.ok, message.data];
}
