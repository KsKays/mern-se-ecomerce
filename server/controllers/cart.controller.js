const CartModel = require("../models/Cart");

//createCart

exports.createCart = async (req, res) => {
  /**
   * #swagger.tags = ['Cart Item']
   * #swagger.summary = "Create a cart item"
   * #swagger.description = 'This endpoint creates a new cart item or updates the quantity of an existing item in the cart.'
   * #swagger.parameters['body'] = {
   *   in: 'body',
   *   description: 'Product information to be added to the cart',
   *   required: true,
   *   schema: {
   *     type: 'object',
   *     properties: {
   *       productId: { type: 'string', description: 'Unique identifier for the product' },
   *       name: { type: 'string', description: 'Name of the product' },
   *       price: { type: 'number', description: 'Price of the product' },
   *       image: { type: 'string', description: 'URL to the product image' },
   *       quantity: { type: 'number', description: 'Quantity of the product to be added to the cart' },
   *       email: { type: 'string', description: 'Email of the user adding the item to their cart' }
   *     },
   *     example: {
   *       productId: '12345',
   *       name: 'Sample Product',
   *       price: 29.99,
   *       image: 'https://example.com/image.jpg',
   *       quantity: 2,
   *       email: 'user@example.com'
   *     }
   *   }
   * }
   */
  const { productId, name, price, image, quantity, email } = req.body;
  if (!productId || !name || !price || !image || !quantity || !email) {
    res.status(400).json({ message: "Product information is missing!" });
    return;
  }
  try {
    //Existing item in our cart
    const existingItem = await CartModel.findOne({ productId, email });
    if (existingItem) {
      existingItem.quantity += quantity;
      const data = await existingItem.save();
      return res.json(data);
    }
    //add item for the first time
    const cart = new CartModel({
      productId,
      name,
      price,
      image,
      quantity,
      email,
    });
    const data = await cart.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something went wrong while adding the product to cart",
    });
  }
};

//getAllCartItems
exports.getAllCartItems = async (req, res) => {
  /**
   * #swagger.tags = ['Cart Item']
   * #swagger.summary = "Get all cart items"
   * #swagger.description = 'This endpoint retrieves all the cart items for all users.'
   * #swagger.responses[200] = {
   *   description: 'List of all cart items',
   *   schema: {
   *     type: 'array',
   *     items: {
   *       type: 'object',
   *       properties: {
   *         productId: { type: 'string' },
   *         name: { type: 'string' },
   *         price: { type: 'number' },
   *         image: { type: 'string' },
   *         quantity: { type: 'number' },
   *         email: { type: 'string' }
   *       }
   *     }
   *   }
   * }
   */
  try {
    const cartItems = await CartModel.find();
    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "Cart not found!" });
    }
    res.json(cartItems);
  } catch {
    res.status(500).json({
      message: "Something error occurred while retrieving the cart!",
    });
  }
};

//getCartItemsByEmail
exports.getCartItemsByEmail = async (req, res) => {
  /**
   * #swagger.tags = ['Cart Item']
   * #swagger.summary = "Get cart items by email"
   * #swagger.description = 'This endpoint retrieves all cart items for a specific user based on their email address.'
   * #swagger.parameters['email'] = {
   *   in: 'path',
   *   description: 'Email address of the user to get their cart items',
   *   required: true,
   *   type: 'string',
   *   example: 'user@example.com'
   * }
   * #swagger.responses[200] = {
   *   description: 'List of cart items for the user',
   *   schema: {
   *     type: 'array',
   *     items: {
   *       type: 'object',
   *       properties: {
   *         productId: { type: 'string' },
   *         name: { type: 'string' },
   *         price: { type: 'number' },
   *         image: { type: 'string' },
   *         quantity: { type: 'number' },
   *         email: { type: 'string' }
   *       }
   *     }
   *   }
   * }
   */
  const { email } = req.params;
  if (!email) {
    res.status(400).json({ message: "Email is missing!" });
    return;
  }
  try {
    const cartItems = await CartModel.find({ email });
    res.json(cartItems);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something went wrong while fetching the cart",
    });
  }
};

//updateCartItem
exports.updateCartItem = async (req, res) => {
  /**
   * #swagger.tags = ['Cart Item']
   * #swagger.summary = "Update a cart item quantity"
   * #swagger.description = 'This endpoint updates the quantity of a specific cart item based on its ID.'
   * #swagger.parameters['id'] = {
   *   in: 'path',
   *   description: 'The unique identifier of the cart item to be updated',
   *   required: true,
   *   type: 'string'
   * }
   * #swagger.parameters['body'] = {
   *   in: 'body',
   *   description: 'New quantity to update for the cart item',
   *   required: true,
   *   schema: {
   *     type: 'object',
   *     properties: {
   *       quantity: { type: 'number', description: 'Updated quantity of the cart item' }
   *     },
   *     example: {
   *       quantity: 3
   *     }
   *   }
   * }
   * #swagger.responses[200] = {
   *   description: 'Cart item updated successfully',
   *   schema: {
   *     type: 'object',
   *     properties: {
   *       productId: { type: 'string' },
   *       name: { type: 'string' },
   *       price: { type: 'number' },
   *       image: { type: 'string' },
   *       quantity: { type: 'number' },
   *       email: { type: 'string' }
   *     }
   *   }
   * }
   */
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).json({ message: "Product information is missing!" });
  }

  try {
    const updatedCart = await CartModel.findByIdAndUpdate(
      id,
      { quantity },
      {
        useFindAndModify: false,
      }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart item not found!" });
    }

    res.json(updatedCart);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while updating the cart item",
    });
  }
};

//deleteCartItem
exports.deleteCartItem = async (req, res) => {
  /**
   * #swagger.tags = ['Cart Item']
   * #swagger.summary = "Delete a cart item"
   * #swagger.description = 'This endpoint deletes a specific cart item based on its ID.'
   * #swagger.parameters['id'] = {
   *   in: 'path',
   *   description: 'The unique identifier of the cart item to be deleted',
   *   required: true,
   *   type: 'string'
   * }
   * #swagger.responses[200] = {
   *   description: 'Cart item deleted successfully',
   *   schema: {
   *     type: 'object',
   *     properties: {
   *       message: { type: 'string', example: 'Cart item deleted successfully!' }
   *     }
   *   }
   * }
   */
  const { id } = req.params;
  try {
    const cartItem = await CartModel.findByIdAndDelete(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found!" });
    }
    res.json({ message: "Cart item deleted successfully!" });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something went wrong while deleting the cart item",
    });
  }
};

//clearAllItem
exports.clearAllItem = async (req, res) => {
  /**
   * #swagger.tags = ['Cart Item']
   * #swagger.summary = "Clear all items in the cart"
   * #swagger.description = 'This endpoint clears all the items in the cart for a user identified by their email address.'
   * #swagger.parameters['email'] = {
   *   in: 'path',
   *   description: 'Email address of the user whose cart items will be deleted',
   *   required: true,
   *   type: 'string',
   *   example: 'user@example.com'
   * }
   * #swagger.responses[200] = {
   *   description: 'All cart items deleted successfully',
   *   schema: {
   *     type: 'object',
   *     properties: {
   *       message: { type: 'string', example: 'Cart cleared successfully.' }
   *     }
   *   }
   * }
   */
  const { email } = req.params;
  try {
    const cart = await CartModel.deleteMany({ email });
    if (cart.deletedCount === 0) {
      return res.status(404).json({ message: "Cart is Empty" });
    }
    res.status(200).json({ message: "Cart cleared successfully." });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while clearing the shopping cart",
    });
  }
};
