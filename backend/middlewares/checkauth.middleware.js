import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).send("you are not loged in");
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(_id);
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

export default checkAuth;
