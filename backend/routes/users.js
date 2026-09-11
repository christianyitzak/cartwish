const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const User = require("../models/users");

const createUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  deliveryAddress: Joi.string().min(5).required()
});

router.post("/", async (req, res) => {
  const { name, email, password, deliveryAddress } = req.body;

  const joiValidation = createUserSchema.validate(req.body);

  if (joiValidation.error) {
    return res.status(400).json(joiValidation.error.details[0].message);
  };

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "User already exist!" });
  };

  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPass,
    deliveryAddress
  });

  await newUser.save();

  res.status(201).json(newUser);
});

module.exports = router;