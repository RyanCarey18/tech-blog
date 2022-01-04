const commentFormHandler = async (event) => {
  event.preventDefault();

  // Collect data from text box
  const comment = document.querySelector("#user-comment").value.trim();
  const post_id = document.getElementById("btn").getAttribute("data-id");

  //if there is a comment then send a request to server to create new comment
  if (comment) {
    const response = await fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({ comment, post_id }),
      headers: { "Content-Type": "application/json" },
    });

    //if the request is okay refresh the post page
    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
