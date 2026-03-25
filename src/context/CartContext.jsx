import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

//   const addToCart = (product) => {
//     setCart(prev => {
//       const exists = prev.find(item => item.id === product.id);
//       if (exists) {
//         return prev.map(item =>
//           item.id === product.id
//             ? { ...item, qty: item.qty + 1 }
//             : item
//         );
//       }
//       return [...prev, { ...product, qty: 1 }];
//     });
//   };
const addToCart = (product) => {
  setCart(prev => {
    const existing = prev.find(p => p.id === product.id)

    if (existing) {
      return prev.map(p =>
        p.id === product.id
          ? { ...p, qty: p.qty + 1 }
          : p
      )
    }

    return [
      ...prev,
      {
        ...product,
        primary_image: product.primary_image,
        qty: 1
      }
    ]
  })
}

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  //

  const increaseQty = (id) => {
  setCart(prev =>
    prev.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    )
  )
}

const decreaseQty = (id) => {
  setCart(prev =>
    prev
      .map(item =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter(item => item.qty > 0)
  )
}

const clearCart = () => {
  setCart([]);
};
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart,increaseQty,decreaseQty,clearCart, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
