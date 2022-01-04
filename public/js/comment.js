const commentFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const comment = document.querySelector('#user-comment').value.trim();
  const post_id = document.getElementById('btn').getAttribute('data-id');
  if (comment) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/comments/', {
      method: 'POST',
      body: JSON.stringify({ comment, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace(`/post/${post_id}`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
