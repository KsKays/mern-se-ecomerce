import { useState } from "react";
import CartService from "../services/cart.service";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import useCart from "../hooks/useCart";
import Swal from "sweetalert2";

const Card = ({ item }) => {
  const { id, name, image, description, category, price } = item;
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };


  const handleAddToCart = async () => {
    if (!user || !user.email) {
      Swal.fire({
        icon: "error ",
        title: "Oops...",
        text: "Please login to add to cart",
      });
      return;
    }
    try {
      const cartItem = {
        productId: _id,
        email: user.email,
        quantity: 1,
        name,
        price,
        image,
      };
      const response = await CartService.createCartItem(cartItem);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Item added to cart",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  return (
    <div className="card shadow-xl relative mr-5 md:my-5  h-120">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 z-10 heartStart `}
        onClick={handleHeartClick}
      >
        <input
          type="radio"
          name="rating"
          className={`mask mask-heart ${isHeartFilled ? "bg-green-500" : ""} `}
        />
      </div>
      <figure>
        <img
          src={image}
          alt=""
          className="hover:scale-105 transition-all duration-300 md:h-60"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-bold">
            {price}
            <span className="text-sm text-red">$</span>
          </h5>
          {/* <button className="btn bg-red text-white">Add to Card</button> */}
          <button className="btn bg-red text-white" onClick={handleAddToCart}>
            Add to Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
