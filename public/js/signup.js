//The code to create a new login for the website
const signupFormHandler = async (event) => {
  event.preventDefault();

  //grab info from text boxes
  const username = document.querySelector("#user-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  //if there was info in both boxes send info to server
  if (username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    //if response is okay send to dashboard
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
