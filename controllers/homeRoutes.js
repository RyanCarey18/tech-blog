const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//load the posts on the homescreen
router.get("/", async (req, res) => {
  try {
    // Get all Posts and join with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // Render Homepage with passed in data
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//The information to load a singular post with comments
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    //Find a post by the post id with the included user and comment data.
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["comment", "date_created"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    //grab the posts and and comments
    const post = postData.get({ plain: true });
    const comments = post.comments.map((comment) => comment);

    //render the information to the post page
    res.render("post", {
      ...post,
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Check the dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find in the post information of the current user
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    //render the users dashboard with gathered data
    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in send them to their dashboard
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  // If the user is already logged in send them to their dashboard
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signup");
});

router.get("/newpost", (req, res) => {
  res.render("newpost");
});

module.exports = router;
