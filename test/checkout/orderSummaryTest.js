import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadProducts,loadProductsFetch}  from "../../data/products.js";
import {cart} from '../../data/cart-class.js';
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  //fixed testing with a backend
  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

      document.querySelector('.js-test-container').innerHTML = `
    <div class = "js-order-summary"></div>
    <div class = "js-payment-summary"></div>
    `;
    
    cart.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
    
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  })
  
  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    expect(document.querySelector(`.js-product-name-${productId1}`).innerHTML).toContain(getProduct(productId1).name);

    expect(document.querySelector(`.js-product-name-${productId2}`).innerHTML).toContain(getProduct(productId2).name);

    expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual(`$${formatCurrency(getProduct(productId1).priceCents)}`);

    expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual(`$${formatCurrency(getProduct(productId2).priceCents)}`);

  });
  it('removes a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();   
    
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);

     expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
     //is the cart array imported?
     expect(cart.cartItems.length).toEqual(1);
     expect(cart.cartItems[0].productId).toEqual(productId2);


    expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual(getProduct(productId2).name);

    expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual(`$${formatCurrency(getProduct(productId2).priceCents)}`);
  });  

  it('changes delivery option', () => {
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();
    const checker = document.querySelector(`.js-delivery-option-input-${productId1}-3`);
    expect(checker.checked).toEqual(true);
    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

    expect(document.querySelector('.js-shipping-price').innerText).toEqual('$14.98');

    expect(document.querySelector('.js-price-total').innerText).toEqual('$63.50');
  });
});
