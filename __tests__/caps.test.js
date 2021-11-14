'use strict';

const events = require('../event-pool');

let orderDetails = {
    store: 'SI-FlowerShop',
    orderID: 'b4101d62-1075-4e94-b239-53d89b589ea9',
    customer: 'Mrs. Leroy Mueller',
    address: '12803 Raynor Branch'
};

describe('Testing Events', () => {
    let consoleSpy;

    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });
      
    it('pickup event is Working', async () => {
        events.emit('pickup', orderDetails);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });

    it('in-transit event is Working', async () => {
        events.emit('in-transit', orderDetails);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });

    it('delivered event is Working', async () => {
        events.emit('delivered', orderDetails);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });


    afterAll(() => {
        consoleSpy.mockRestore();
    });

});