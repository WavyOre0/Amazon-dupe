import { products } from "../data/products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) 

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}


export function addtoCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (productId != cartItem.productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}
export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateCartQuantity() {
  calculateCartQuantity();

  console.log('Cart size:', cartSize);
  console.log('Looking for element...');
  const checkoutElement = document.querySelector('[js-checkout-quantity]');
  console.log('Found element:', checkoutElement);
  console.log('Element exists?', checkoutElement !== null);

  if (checkoutElement) {
    checkoutElement.innerHTML = `Cart(${cartSize} items)`;
    console.log('Updated innerHTML successfully');
  } else {
    console.error('Element with [js-checkout-quantity] NOT FOUND');
    // Let's see what IS on the page
    console.log('All divs:', document.querySelectorAll('div'));
  }
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId 
      & newQuantity >0 & newQuantity <= 1000) {
      cartItem.quantity = newQuantity;
    } else {
      console.log("invalid number, try again!");
    }
    saveToStorage();
  })
}
