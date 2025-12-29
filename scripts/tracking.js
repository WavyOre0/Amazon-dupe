import {getOrder} from "../data/orders.js";
import {getProduct, loadProductsFetch} from "../data/products.js";
import {cart} from "../data/cart-class.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';






async function renderTrackingHTML() {
  await loadProductsFetch();

  document.querySelector('.js-cart-quantity').innerHTML = JSON.stringify(cart.calculateCartQuantity());
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);
  let productDetails;
  console.log(order);
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });
  console.log(productDetails);
  const deliveryDate = dayjs(productDetails.estimatedDeliveryTime).format("dddd, MMMM DD");
  const today = dayjs()
  const shippingProgressCalculator = today.subtract()
   const trackingHtml = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${deliveryDate}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`;
        console.log(trackingHtml);
    document.querySelector('.js-order-tracking').innerHTML =  trackingHtml;
}
renderTrackingHTML();