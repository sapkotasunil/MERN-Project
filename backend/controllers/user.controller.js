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

export { register, login };
