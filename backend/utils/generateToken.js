import jwt from "jsonwebtoken";
const genereteToken = (_id, res) => {
  const token = jwt.sign({ _id }, "myjwtsecretkey", { expiresIn: "3d" });
  res.cookie("jwt", token, { maxAge: 3 * 24 * 60 * 100 });
};

export default genereteToken;
