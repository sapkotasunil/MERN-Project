import User from "../models/User.js";
import genereteToken from "../utils/generateToken.js";

const register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const user = await User.findOne({ email });
  if (user) return res.status(400).send({ error: "user already exists" });
  const registerdUser = await User.create({ name, email, password, isAdmin });
  res
    .status(201)
    .send({ message: "user created sucessfully", user: registerdUser });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send({ error: "user doesn't found" });
  const isMatched = await user.comparePassword(password);
  if (!isMatched)
    return res.status(404).send({ error: "Password doesn't matched" });
  genereteToken(user._id, res);
  res.status(200).send({
    message: "user login sucessfully",

    user: {
      name: user.name,
      email: user.email,
    },
  });
};

const getProfile = (req, res) => {
  const user = req.user;
  res.status(200).send(user);
};

const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.send({ message: "User logout sucessfully !!" });
};

const userUpdate = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.user._id);
  user.name = name || user.name;
  user.email = email || user.email;
  if (password) user.password = password;
};

export { register, login, getProfile, logout, userUpdate };
