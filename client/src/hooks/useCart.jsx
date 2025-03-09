import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import CartService from "../services/cart.service";

const useCart = () => {
  const { user } = useContext(AuthContext);

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const response = await CartService.getCartItemsByEmail(user?.email);
      return response.data;
    },
  });
  return [cart, refetch];
};

export default useCart;
