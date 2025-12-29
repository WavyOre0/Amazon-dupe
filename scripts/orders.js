import {orders} from "../../data/orders.js";
import {cart} from "../../data/cart-class.js";
import { formatCurrency} from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { loadProductsFetch, getProduct } from "../../data/products.js";


async function renderOrders() {
  await loadProductsFetch();
  document.querySelector(".js-cart-quantity").innerHTML = JSON.stringify(cart.calculateCartQuantity());
  let ordersSummary = '';
  console.log(orders);
  orders.forEach((order) => {
    const products = order.products;
    console.log(products);
    const orderDate = dayjs(order.orderTime).format("MMMM DD");
    const totalCents = formatCurrency(order.totalCostCents);
    ordersSummary += `
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${totalCents}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productsOfOrder(order)}
          </div>
        </div>`
  });
  document.querySelector('.js-orders-grid').innerHTML = ordersSummary;
  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      cart.addtoCart(productId);
      document.querySelector(".js-cart-quantity").innerHTML = JSON.stringify(cart.calculateCartQuantity());
    })
  })
  
};
function productsOfOrder(order) {
  let html = '';
  order.products.forEach((productDetails) => {
    const product = getProduct(productDetails.productId);
    console.log(product);
    const productDelivery = dayjs(productDetails.estimatedDeliveryTime).format("MMMM DD");
    html += `
            <div class="product-image-container">
              <img src= ${product.image}>
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${productDelivery}
              </div>
              <div class="product-quantity">
                Quantity: ${productDetails.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again" data-product-id="${productDetails.productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${productDetails.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`
  });
  return html;
}

renderOrders();
