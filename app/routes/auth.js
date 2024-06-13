var express = require("express");
var router = express.Router();
const authController = require("../controllers/authenticationController");
const validateRegisterRequest = require("../middlewares/registerUserValidator");
const validateLoginRequest = require("../middlewares/loginUserValidator");
const checkAuthentication = require("../middlewares/checkAuthentication");

router.post("/auth/register", validateRegisterRequest, authController.register);
router.post("/auth/login", validateLoginRequest, authController.login);
router.get("/user", checkAuthentication, authController.history);

// router.get("/user/:id", checkAuth, async (req, res) => {
//     const user = await User.findOne({ email: req.user }).populate("friends");

//     return res.json({
//       errors: [],
//       data: {
//         user: {
//           id: user?._id,
//           email: user?.email,
//           username: user?.username,
//           friends: [],
//           expenses: []
//         },
//       },
//     });
//   });

module.exports = router;
