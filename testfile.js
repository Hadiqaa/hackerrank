const chai = require('chai');
const expect = chai.expect;
const Processor = require('./processing'); // Adjust the path to your Processor class

describe('Processor', () => {
  let processor;

  beforeEach(() => {
    processor = new Processor();
  });

  it('should emit PROCESSING_STARTED event', (done) => {
    processor.on('PROCESSING_STARTED', (orderNumber) => {
      expect(orderNumber).to.equal('12345');
      done();
    });

    processor.placeOrder({
      orderNumber: '12345',
      lineitems: [
        { itemId: 'item1', quantity: 3 },
        { itemId: 'item2', quantity: 5 }
      ]
    });
  });

  it('should emit PROCESSING_FAILED event for invalid item', (done) => {
    processor.on('PROCESSING_FAILED', (payload) => {
      expect(payload.orderNumber).to.equal('12345');
      expect(payload.reason).to.equal('LINEITEMS_EMPTY');
      expect(payload.itemId).to.equal('item1'); // Correct item ID
      done();
    });
  
    processor.placeOrder({
      orderNumber: '12345',
      lineitems: [
        { itemId: 'item1', quantity: 3 },
        { itemId: 'item2', quantity: 5 },
        { itemId: 'item3', quantity: 10 } // Invalid item
      ]
    });
  });
  
});
