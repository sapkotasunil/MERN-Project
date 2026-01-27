import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("user", "name email -_id");
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).send({ error: "product not found" });
  res.status(200).send(product);
};

const addProduct = async (req, res) => {
  const product = {
    user: req.user._id,
    name: "Sample Name",
    description: "Sample Description",
    price: 0,
    brand: "Sample Brand",
    category: "Sample Category",
  };
  const newProduct = await Product.create(product);
  res
    .status(201)
    .send({ message: "Product added sucessfully", product: newProduct });
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  const { brand, category, price, description, name, image } = req.body;
  if (!product) return res.status(404).send({ error: "product not found" });
  product.name = name || product.name;
  product.description = description || product.description;
  product.image = image || product.image;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.price = price || product.price;
  await product.save();
  res.status(200).send({ message: "product update sucessfully" });
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct)
    return res.status(404).send({ error: "product not found" });
  res.status(200).send({ message: "deleted product sucessfully" });
};

const addReview = async (req, res) => {
  // console.log(req.user);
  const user = req.user._id;
  const productId = req.params.id;
  const { title, comment, rating } = req.body;
  const reviews = { title, comment, rating, user };

  const product = await Product.findById(productId);
  if (!product) return res.status(404).send({ error: "product not found" });
  const alreadyReviews = product.reviews.find((r) => r.user.toString() == user);
  if (alreadyReviews)
    return res.status(400).send({ error: "user already review" });
  product.reviews.push(reviews);

  product.numReviews += 1;
  const totalRating = product.reviews.reduce((acc, r) => acc + r.rating, 0);
  product.rating = totalRating / product.numReviews.toFixed(2);
  await product.save();
  res.status(201).send({ message: "Added review susessfully" });
};

export {
  addProduct,
  getProducts,
  getProductById,
  addReview,
  updateProduct,
  deleteProduct,
};
