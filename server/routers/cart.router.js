const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");

router.post("/", CartController.createCart);

router.get("/", CartController.getAllCartItems);

router.get("/:email", CartController.getCartItemsByEmail);

router.put("/:id", CartController.updateCartItem);

router.delete("/:id", CartController.deleteCartItem);

router.delete("/clear/:email", CartController.clearAllItem);

module.exports = router;
