import express from 'express' 
const router = express.Router()


import {
  getSignup,
  getSignin,
  signup,
  signin,
  logout,
  showArticlesAdmin,
} from "../controllers/ControllerAuth.js";


router.route("/signup").get(getSignup);
router.route("/signup").post(signup);

router.route("/login").get(getSignin);
router.route("/login").post(signin);

router.route("/logout").get(logout)
router.route("/articles").get(showArticlesAdmin);




export default router;