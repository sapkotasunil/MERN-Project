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

export { addProduct, getProducts, getProductById };
