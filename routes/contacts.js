const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/auth");

const User = require("../models/User");
const Contact = require("../models/Contact");

// @route    GET api/contacts
// @desc     Get all logged in user's contacts
// @access   Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (e) {
    console.log(e.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong on our side. Try again" });
  }
});

// @route    POST api/contacts
// @desc     Add new contact
// @access   Private
router.post(
  "/",
  authMiddleware,
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Provide a valid email").isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }

    const { name, email, type, phone } = req.body;
    try {
      const contact = await Contact.create({
        name,
        email,
        type,
        phone,
        user: req.user.id
      });
      res.json(contact);
    } catch (e) {
      console.log(e.message);
      return res
        .status(500)
        .json({ msg: "Something went wrong on our side. Try again" });
    }
  }
);

// @route    PUT api/contacts/:id
// @desc     Update a contact
// @access   Private
router.put("/:id", authMiddleware, async (req, res) => {
  const { name, email, type, phone } = req.body;

  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (type) contactFields.type = type;
  if (phone) contactFields.phone = phone;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (e) {
    console.log(e.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong on our side. Try again" });
  }
});

// @route    DELETE api/contacts/:id
// @desc     Delete a contact
// @access   Private
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    contact = await Contact.findByIdAndRemove(req.params.id);
    res.json(contact);
  } catch (e) {
    console.log(e.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong on our side. Try again" });
  }
});

module.exports = router;
