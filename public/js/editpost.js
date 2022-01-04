//The code to create a new post
const editFormHandler = async (event) => {
  event.preventDefault();

  //grab the info from the text boxes
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();
  const id = document.getElementById("btn").getAttribute("data-id");

  //if there is info in both boxes then send a request to the server
  if (title && content && id) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content, id }),
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

const delButtonHandler = async (event) => {
  if (document.getElementById("del-btn").hasAttribute("data-id")) {
    const id = document.getElementById("del-btn").getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete posts");
    }
  }
};

document.querySelector(".del-btn").addEventListener("click", delButtonHandler);

document
  .querySelector(".new-post-form")
  .addEventListener("submit", editFormHandler);
