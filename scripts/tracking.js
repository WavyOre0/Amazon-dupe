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
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });
  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const shippingProgressCalculator =  ((today - orderTime) / (deliveryTime - orderTime)) * 100;
  console.log(shippingProgressCalculator);

   const trackingHtml = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${deliveryTime.format("dddd, MMMM DD")}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${(shippingProgressCalculator < 50) ? 'current-status' : ''}">
            Preparing
          </div>
          <div class="progress-label ${(shippingProgressCalculator >= 50 && shippingProgressCalculator < 100) ? 'current-status' : ''}">
            Shipped
          </div>
          <div class="progress-label ${(shippingProgressCalculator >= 100) ? 'current-status' : ''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style = "width:${shippingProgressCalculator}%;"></div>
        </div>`;
    document.querySelector('.js-order-tracking').innerHTML =  trackingHtml;
}

renderTrackingHTML();