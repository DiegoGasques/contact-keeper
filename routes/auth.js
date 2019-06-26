const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (e) {
    console.log(e.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong on our side. Try again" });
  }
});

// @route    POST api/auth
// @desc     Auth user & return token
// @access   Public
router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(422).json({ msg: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(422).json({ msg: "Invalid credentials" });
      }

      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (e) {
      console.log(e.message);
      return res
        .status(500)
        .json({ msg: "Something went wrong on our side. Try again" });
    }
  }
);

module.exports = router;
