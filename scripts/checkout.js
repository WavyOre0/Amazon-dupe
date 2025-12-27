import { renderOrderSummary} from './checkout/orderSummary.js';

import { renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';


async function loadPage() { // async makes a function return a promise
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
   //await lets us write asynchronous code like normal code
  renderOrderSummary();
  renderPaymentSummary();

  //return 'value2'; this is like resolve('value2')
}
loadPage();
/*
//async await is a better way of this
Promise.all([
 loadProductsFetch()
]).then ((value) => {
  renderOrderSummary();
  renderPaymentSummary();
  console.log(value);
});
*/

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