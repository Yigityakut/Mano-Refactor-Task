class ProductsStore {
  products = [];
  cartItems = [];
  addresses = [];

  constructor() {
    // `makeAutoObservable` automatically infers observables, actions, and computed values, simplifying the syntax
    makeAutoObservable(this);
  }

  async fetchProducts() {
    try {
      this.products = await ApiService.fetchProducts();
    } catch (error) {
      // Error handling could be enhanced by setting an 'error' state observable and displaying it in the UI
    }
  }

  async fetchAddresses() {
    try {
      this.addresses = await ApiService.fetchAddresses();
    } catch (error) {
      // Error handling could be enhanced by setting an 'error' state observable and displaying it in the UI
    }
  }

  addToCart(product) {
    this.cartItems.push(product);
  }

  removeFromCart(productId) {
    const index = this.cartItems.findIndex((item) => item.id === productId);
    // Added a check to ensure the item exists in the cart before attempting to remove it, preventing potential errors
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }
}

// Separate API calls into a utility or service module for better separation of concerns
class ApiService {
  static async fetchProducts() {
    try {
      // Async/await syntax is used for better readability and error handling

      const response = await axios.get("https://example-api.com/products");
      return response.data;
    } catch (error) {
      console.error("Error fetching products: ", error);
      throw error; // Rethrow to allow handling by the caller if needed
    }
  }

  static async fetchAddresses() {
    try {
      // Async/await syntax is used for better readability and error handling
      const response = await axios.get("https://example-api.com/addresses");
      return response.data;
    } catch (error) {
      console.error("Error fetching addresses: ", error);
      throw error;
    }
  }
}

const store = new ProductsStore();
export default store;

//
// import { makeObservable, observable, action } from "mobx";
// class ProductsStore {
//   products = [];
//   cartItems = [];
//   addresses = [];
//   constructor() {
//     makeObservable(this);
//   }
//   fetchProducts() {
//     axios
//       .get("https://example-api.com/products")
//       .then((response) => {
//         this.products = response.data;
//       })
//       .catch((error) => console.error("Error fetching products: ", error));
//   }
//   fetchAddresses() {
//     axios
//       .get("https://example-api.com/addresses")
//       .then((response) => {
//         this.addresses = response.data;
//       })
//       .catch((error) => console.error("Error fetching addresses: ", error));
//   }
//   addToCart(product) {
//     this.cartItems.push(product);
//   }
//   removeFromCart(productId) {
//     const index = this.cartItems.findIndex((item) => item.id === productId);
//     this.cartItems.splice(index, 1);
//   }
// }
// const store = new ProductsStore();
// export default store;
