const Stripe = require("stripe");
const stripe = Stripe(process.env.SECRET_KEY_STRIPE);
const OrderModel = require("../models/Order");
const CartModel = require("../models/Cart");

exports.createCheckOutSession = async (req, res) => {
  const cartItems = req.body.cart;
  const products = cartItems.map((item) => {
    return {
      productId: item.productId,
      quantity: item.quantity,
    };
  });

  //customer information
  const customer = await stripe.customers.create({
    metadata: {
      email: req.body.email.toString(),
      cart: JSON.stringify(products),
    },
  });

  const line_items = cartItems.map((item) => {
    return {
      price_data: {
        currency: "thb",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.name,
          metadata: {
            productId: item.productId,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "promptpay"], //payment method
    shipping_address_collection: {
      allowed_countries: ["TH"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "thb",
          },
          display_name: "Free Shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 4500,
            currency: "thb",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],

    phone_number_collection: {
      enabled: true,
    },
    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.BASE_URL}/checkout-success`,
    cancel_url: `${process.env.BASE_URL}/cart`,
  });

  console.log(session);

  res.send({ url: session.url });
};

const clearCart = async (email) => {
  try {
    await CartModel.deleteMany({ email });
    console.log("Cart is cleared");
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while clearing the cart",
    });
  }
};

const createOrder = async (customer, data) => {
  const products = JSON.parse(customer.metadata.cart);
  console.log("Products", products);
  try {
    const newOrder = await OrderModel.create({
      email: customer.metadata.email,
      customerId: data.customer,
      products: products,
      subtotal: data.amount_subtotal,
      total: data.amount_total / 100,
      shipping: data.customer_details,
      payment_status: data.payment_status,
    });
    if (newOrder) {
      console.log("Order is created");
      await clearCart(customer.metadata.email);
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while creating new order",
    });
  }
};
exports.webhook = async (req, res) => {
  console.log("webhook is called");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  console.log(endpointSecret);
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send({ message: `Webhook Error: ${err.message}` });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      console.log("Payment received");
      let data = event.data.object;
      stripe.customers.retrieve(data.customer).then(async (customer) => {
        try {
          await createOrder(customer, data);
        } catch (err) {
          res.status(500).send({ message: `Webhook Error: ${err.message}` });
        }
      });
      break;

    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).end();
};
