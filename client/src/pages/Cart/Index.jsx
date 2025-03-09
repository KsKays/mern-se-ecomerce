import React, { useContext } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import CartService from "../../services/cart.service";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/Authcontext";

import PaymentButton from "./../../components/PaymentButton";

const Index = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);

  //คำนวน Total Price
  let totalPrice = 0;
  for (let index = 0; index < cart.length; index++) {
    totalPrice += cart[index].quantity * cart[index].price;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  const handleDeleteItem = async (cartItem) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      showConfirmButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CartService.deleteCartItemById(cartItem._id);

          if (response.status === 200) {
            refetch(); // อัปเดตข้อมูลตะกร้าใหม่
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Item has been removed from your cart.",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      }
    });
  };

  const handleClearCart = async () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure to clear your shopping cart?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      showConfirmButton: true,
      confirmButtonText: "Yes, clear it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CartService.clearCart(user?.email);
          if (response.status === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Shopping Cart Cleared!",
              text: response.message,
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      }
    });
  };

  // const handleIncrease = async (cartItem) => {
  //   if (cartItem.quantity + 1 <= 10) {
  //     try {
  //       const response = await CartService.updateCartItem(cartItem._id, {
  //         quantity: cartItem.quantity + 1,
  //       });
  //       if (response.status === 200) {
  //         refetch();
  //       }
  //     } catch (error) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: error.message,
  //       });
  //     }
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Maximum quantity is 10",
  //     });
  //   }
  // };

  const handleIncrease = async (cartItem) => {
    if (cartItem.quantity + 1 <= 10) {
      try {
        const response = await CartService.updateCartItem(cartItem._id, {
          quantity: cartItem.quantity + 1,
        });
        if (response.status === 200) {
          refetch();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data?.message || "Something went wrong!",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Item Max product",
        text: "The product is full.",
      });
    }
  };

  // const handleDecrease = async (cartItem) => {
  //   if (cartItem.quantity > 1) {
  //     try {
  //       const response = await CartService.updateCartItem(cartItem._id, {
  //         quantity: cartItem.quantity - 1,
  //       });
  //       if (response.status === 200) {
  //         refetch();
  //       }
  //     } catch (error) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: error.message,
  //       });
  //     }
  //   } else {
  //     handleDeleteItem(cartItem);
  //   }
  // };
  const handleDecrease = async (cartItem) => {
    if (cartItem.quantity > 1) {
      try {
        const response = await CartService.updateCartItem(cartItem._id, {
          quantity: cartItem.quantity - 1,
        });
        if (response.status === 200) {
          refetch();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    } else {
      handleDeleteItem(cartItem);
    }
  };

  return (
    <div>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
          <div className="pt-20 flex flex-col items-center justify-center">
            <div className="text-center px-4 space-y-7">
              <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                Items Added to The <span className="text-red">Cart</span>
              </h2>
            </div>
          </div>
        </div>
        {cart.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-red text-white rounded-sm text-center">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price Per Unit</th>
                  <th>Price</th>
                  <th>
                    <button
                      className="btn btn-outline btn-error"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {cart.length > 0 &&
                  cart.map((cartItem, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            {" "}
                            <img
                              src={cartItem.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold">{cartItem.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="space-x-6 text-center">
                          <button
                            className="btn btn-xs mr-6"
                            onClick={() => handleDecrease(cartItem)}
                          >
                            -
                          </button>
                          {cartItem.quantity}
                          <button
                            className="btn btn-xs mr-2"
                            onClick={() => handleIncrease(cartItem._id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-center">
                        {formatPrice(cartItem.price)}
                      </td>
                      <td className="text-center">
                        {formatPrice(cartItem.quantity * cartItem.price)}
                      </td>
                      <td className="text-center">
                        <button onClick={() => handleDeleteItem(cartItem)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <hr />
            <div className="flex flex-col md:flex-row justtify-between items-start my-12 gap-8">
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold">Customer Details</h3>
                <p>Name:{user?.displayName}</p>
                <p>Email:{user?.email}</p>
                <p>User Id:{user?.uid}</p>
              </div>
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold">Shopping</h3>
                <p>Total Items:{cart.length}</p>
                <p>Total Price:{formatPrice(totalPrice)}</p>
                <PaymentButton cartItems={cart} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            {/* <svg
              className="w-24 h-24 text-red-500 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M7 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H7v10zM21 6h-4.18l-1.4-2.8A1.993 1.993 0 0 0 13.42 2H10.6c-.78 0-1.48.45-1.8 1.2L7.4 6H3c-.55 0-1 .45-1 1s.45 1 1 1h1v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V8h1c.55 0 1-.45 1-1s-.45-1-1-1z" />
            </svg> */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-red-500">
                Shopping Cart is Empty!
              </h2>
              <p className="text-lg text-gray-600">
                Looks like you haven't added anything yet.
              </p>
            </div>
            <a
              href="/"
              className="px-6 py-2 text-lg shadow-md hover:shadow-xl transition bg-[#831309] text-white rounded-lg"
            >
              Continue Shopping
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
