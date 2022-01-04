//The code to create a new post
const newFormHandler = async (event) => {
  event.preventDefault();

  //grab the info from the text boxes
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  //if there is info in both boxes then send a request to the server
  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //if the response comes back okay go back to your dashboard
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create posts");
    }
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
