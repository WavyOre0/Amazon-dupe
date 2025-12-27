import { renderOrderSummary} from './checkout/orderSummary.js';

import { renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';

Promise.all([
 loadProductsFetch()
]).then ((value) => {
  renderOrderSummary();
  renderPaymentSummary();
  console.log(value);
});


/*
new Promise((resolve) => {//resolve is a function
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  renderOrderSummary();
  renderPaymentSummary();
  console.log(value);
});

 

loadProducts(() => {
  renderPaymentSummary();
  renderOrderSummary();
});
*/