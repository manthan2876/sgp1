// const express = require("express");
// // const { reactToPost } = require("../controllers/Community-reaction.controller");
// const { reactToPost} = require('../controllers/Community-reaction.controller');

// const authenticateUser = require("../middlewares/authenticateuser");

// const router = express.Router();
// // console.log(reactToPost);  // Add this line to see if it's correctly imported

// // React to a post
// router.post("/", authenticateUser, reactToPost);

// module.exports = router;


const express = require("express");
const { reactToPost } = require("../controllers/Community-reaction.controller");

// console.log("Imported reactToPost:", reactToPost); // Add this line

const authenticateUser = require("../middlewares/authenticateuser");

const router = express.Router();

// React to a post
router.post("/react", authenticateUser, reactToPost);

module.exports = router;
