import React, { Component } from "react";

import Home from "./pages/Home";

import * as api from "./api";

function createCartItem(cartItem) {
  return {
    id: cartItem.id,
    title: cartItem.title,
    img: cartItem.img,
    price: cartItem.price,
    unitsInStock: cartItem.unitsInStock,
    createdAt: cartItem.createdAt,
    updatedAt: cartItem.updatedAt,
    quantity: cartItem.quantity + 1,
  };
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      cartItems: [],
      isLoading: false,
      hasError: false,
      loadingError: null,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    api.getProducts().then((data) => {
      this.setState({
        products: data,
        isLoading: false,
      });
    });
  }

  handleAddToCart(productId) {
    const { cartItems, products } = this.state;
    const cartItem = cartItems.find((item) => item.id === productId);
    const thisProduct = products.find((product) => product.id === productId);

    if (cartItem) {
      const addedItem = cartItems.map((item) => {
        if (item.id !== productId) {
          return item;
        }
        if (item.quantity >= item.unitsInStock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      });
      this.setState({ cartItems: addedItem });
    } else {
      // stat es el array con el estado anterior stat.cartItems recoge el array del estado y le añade el nuevo item = cartProduct
      const cartProduct = createCartItem(thisProduct);
      this.setState((state) => ({
        cartItems: [...state.cartItems, cartProduct],
      }));
    }
  }

  // handleChange(event, productId) {}

  handleRemove(productId) {
    const { cartItems } = this.state;
    const newCart = cartItems.filter((item) => item.id !== productId);

    this.setState({
      cartItems: newCart,
    });
  }

  // handleDownVote(productId) {}

  // handleUpVote(productId) {}

  // handleSetFavorite(productId) {}

  render() {
    const {
      cartItems,
      products,
      isLoading,
      hasError,
      loadingError,
    } = this.state;

    return (
      <Home
        cartItems={cartItems}
        products={products}
        isLoading={isLoading}
        hasError={hasError}
        loadingError={loadingError}
        handleDownVote={() => {}}
        handleUpVote={() => {}}
        handleSetFavorite={() => {}}
        handleAddToCart={(id) => {
          this.handleAddToCart(id);
        }}
        handleRemove={(id) => {
          this.handleRemove(id);
        }}
        handleChange={() => {}}
      />
    );
  }
}

export default App;
