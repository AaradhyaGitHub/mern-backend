const fs = require("fs");
const path = require("path");
const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err && fileContent.length > 0) {
        try {
          cart = JSON.parse(fileContent);
        } catch (parseErr) {
          console.log(
            "Could not parse cart.json, starting with empty cart:",
            parseErr
          );
          cart = { products: [], totalPrice: 0 };
        }
      }

      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      // Add new product or increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const productIndex = updatedCart.products.findIndex(
        (prod) => prod.id === id
      );

      if (productIndex === -1) {
        return;
      }

      const productQty = updatedCart.products[productIndex].qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        if (err) console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err || fileContent.length === 0) {
        // If the file doesn't exist or is empty, return an empty cart
        cb({ products: [], totalPrice: 0 });
      } else {
        try {
          const cart = JSON.parse(fileContent);
          cb(cart);
        } catch (parseErr) {
          console.log("Failed to parse cart.json:", parseErr);
          cb({ products: [], totalPrice: 0 });
        }
      }
    });
  }
};
