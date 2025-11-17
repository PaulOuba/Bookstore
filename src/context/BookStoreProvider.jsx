import { useState } from "react";
import BookStoreContext from "./bookStorContext";
import { books } from "../data/books"; // adjust path

const BookStoreProvider = ({ children }) => {
  const [cartInfo, setCartInfo] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Update search value
  const searchBook = (text) => {
    setSearchText(text);
  };

  // Filter books based on title or author
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase()) ||
    book.author.toLowerCase().includes(searchText.toLowerCase())
  );

  // Handle Add To Cart
  const addToCart = (item, qty) => {
    const newCartItem = {
      id: item.id,
      title: item.title,
      image: item.image,
      price: item.price,
      quantity: qty,
      author: item.author,
    };

    const isExist = cartInfo.find((cart) => cart.id === newCartItem.id);

    if (isExist) {
      setCartInfo(
        cartInfo.map((cart) =>
          cart.id === newCartItem.id ? newCartItem : cart
        )
      );
    } else {
      setCartInfo((prev) => [...prev, newCartItem]);
    }
  };

  // Remove from cart
  const removeFromCart = (id) => {
    const cart = cartInfo.filter((c) => c.id !== id);
    setCartInfo(cart);
  };

  return (
    <BookStoreContext.Provider
      value={{
        cartInfo,
        addToCart,
        removeFromCart,
        cartInfoLength: cartInfo.length,

        // SEARCH
        searchText,
        searchBook,
        filteredBooks,
      }}
    >
      {children}
    </BookStoreContext.Provider>
  );
};

export default BookStoreProvider;
