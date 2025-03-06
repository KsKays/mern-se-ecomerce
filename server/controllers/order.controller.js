const OrderModel = require("../models/Order");

exports.getAllOrder = async (req, res) => {
  try {
    const Orders = await OrderModel.find();
    if (!Orders || Orders.length === 0) {
      return res.status(404).json({ message: "Orders not found!" });
    }
    res.json(Orders);
  } catch {
    res.status(500).json({
      message: "Something error occurred while retrieving the Orders!",
    });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const orderDoc = await OrderModel.findById(id);
    if (!orderDoc) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(orderDoc);
  } catch (error) {
    console.error("Error fetching order:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while fetching order details" });
  }
};

exports.updateOrderDetail = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "id is require" });
  }
  try {
    const orderDetail = await OrderModel.findById(id);
    if (!orderDetail) {
      return res.status(404).json({ message: "Order not found" });
    }
    const { deliver_status } = req.body;
    if (!deliver_status) {
      return res.status(400).json({ message: "deliver_status is require" });
    }
    orderDetail.deliver_status = deliver_status;
    await orderDetail.save();
    res.json(orderDetail);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Something error occurred while Updating order detail",
    });
  }
};
