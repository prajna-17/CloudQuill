const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = process.env.JWT_SECRET;
// ROUTE 1: Create a User using : POST "api/auth/createuser". No login required!!
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;

    //If errors are there return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      //Check Whether User with this Email exits already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User with the same email already exits!!" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      //   .then((user) => res.json(user))
      //   .catch((err) => {
      //     console.log(err);

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2: Authenticate a User using : POST "api/auth/createuser". No login required!!
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be empty").exists(),
    ,
  ],
  async (req, res) => {
    let success = false;

    //if there are errors, return bad req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //Check Whether User with this Email exits already
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please Enter the correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please Enter the correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Sever Error");
    }
  }
);

// ROUTE 3: GET loggedin User details using : POST "api/auth/getuser". Login required!!

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Sever Error");
  }
});
module.exports = router;
