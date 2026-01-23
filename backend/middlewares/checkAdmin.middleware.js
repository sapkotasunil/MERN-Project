function checkAdmin(req, res, next) {
  const isAdmin = req.user.isAdmin;
  if (!isAdmin)
    return res
      .status(403)
      .send({ error: "you have not authorization to perform this operations" });
  next();
}

export default checkAdmin;
