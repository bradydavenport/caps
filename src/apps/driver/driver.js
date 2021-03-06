'use strict';

const { product, chance } = require('../../chance');
const eventPool = require('../../hub');

function shippedHandler(payload) {
  eventPool.emit('PACKAGE_SHIPPED', {
    EVENT: {
      event: 'in-transit',
      time: chance.date(),
      payload: product.payload,
    },
  });
  console.log(`DRIVER: picked up ${product.payload.orderId}`);
  console.log(` 
  EVENT { event: 'in-transit',
    time: ${chance.date()},
    payload: 
      { store: ${product.payload.store},
        orderId: ${product.payload.orderId},
        customer: ${product.payload.customer},
        address: ${product.payload.address} }
  }`);
}

function deliverPackage() {
  setTimeout(() => {
    console.log(`DRIVER: delivered ${product.payload.orderId}`);
    eventPool.emit('PACKAGE_DELIVERED', {
      EVENT: {
        event: 'delivered',
        time: chance.date(),
        payload: product.payload,
      },
    });
  }, 2000);
}

module.exports = {
  shippedHandler,
  deliverPackage,
};
