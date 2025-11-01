const express = require("express");
const { body, validationResult } = require("express-validator");
const { login } = require("../controllers/authController");

const router = express.Router();

router.post(
  "/login",
  [
    body("username").isString().notEmpty(),
    body("password").isString().notEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
  login
);

module.exports = router;
