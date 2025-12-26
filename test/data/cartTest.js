import {cart} from '../../data/cart-class.js';

describe('test suite: addtoCart', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });
  it('adds an existing product to the cart', () => {
    cart.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }];
    cart.addtoCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }]));
  });


  it('adds a new product to the cart', () => {
    //spyOn(localStorage, 'setItem');
    cart.cartItems = [];
    console.log(localStorage.getItem('cart-oop'));


    cart.addtoCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]));
  });
});


describe('test suite: removeFromCart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  beforeEach(() => {
  spyOn(localStorage,'setItem');
  cart.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }];
  });

  it ('remove a productId in the cart', () => {
    cart.removeFromCart(productId1);
    expect(cart.cartItems.length).toEqual(0);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', '[]');
    
  });
  
  it ('remove a productId not in the cart', () => {
    cart.removeFromCart('adas');

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify(cart.cartItems));
  });
  
});

describe ('test suite: updateDeliveryOption', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  beforeEach(() => {
  spyOn(localStorage,'setItem');
  cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];
  });

  it('change delivery Option to second', () => {
    cart.updateDeliveryOption(productId1,'2');

    expect(cart.cartItems[0].deliveryOptionId).toEqual('2');
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '2'
    }]));
  });

  it ('update the delivery option of a productId that is not in the cart', () => {
    cart.updateDeliveryOption('not-a-item', '1');

    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).not.toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
    expect(cart.cartItems.length).toEqual(1);
  });

  it ('update the delivery option of a product inside of the cart, but an invalid delivery option id', () => {
    cart.updateDeliveryOption(productId1, '-1');

    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).not.toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
    expect(cart.cartItems.length).toEqual(1);
  })
})