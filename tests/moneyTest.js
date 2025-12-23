import {formatCurrency} from '../scripts/utils/money.js';

console.log('test suite: formatCurrency');
console.log('testing if converting works properly')
if (formatCurrency(2095) === '20.95'){
  console.log('working');
} else {
  console.log('failed');
}
console.log('works with 0')
if (formatCurrency(0) === '0.00') {
  console.log('worked');
} else {
  console.log('failed');
}
console.log('code rounds up to nearest cent')
if (formatCurrency(2000.5) === '20.01') {
  console.log('worked');
}


