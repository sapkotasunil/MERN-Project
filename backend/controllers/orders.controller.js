import Order from "../models/Order.js";

const addOrders = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    totalPrice,
    shippingCharge,
  } = req.body;

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    totalPrice,
    shippingCharge,
  });

  res
    .status(201)
    .send({ message: "order created sucessfully", orderId: order._id });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.status(200).send(orders);
};

const getUserOrders = async (req, res) => {
  const user = req.user._id;
  const orders = await Order.find({ user: user });
  res.status(200).send(orders);
};

const getOrderByid = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ error: "order not found" });
  res.status(200).send(order);
};

const payOrder = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ error: "order not found" });
  order.isPaid = true;
  order.paidAt = Date.now();
  await order.save();
  res.status(200).send({ message: "order paid sucessfully" });
};
const deliverOrder = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ error: "order not found" });
  order.isDelivered = true;
  order.deliveredAt = new Date().toISOString();
  await order.save();
  res.status(200).send({ message: "order deliverd sucessfully" });
};

export {
  addOrders,
  getAllOrders,
  getUserOrders,
  getOrderByid,
  payOrder,
  deliverOrder,
};
