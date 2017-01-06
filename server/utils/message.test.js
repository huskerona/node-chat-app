const expect = require('expect');
const { generateMessage, generateLocationUrlMessage } = require('./message');

describe('generateMessage', () => {

    it('should generate a correct message object', () => {
        const from = "TestMan";
        const text = "Sample test";

        const res = generateMessage(from, text);

        expect(res).toInclude({ from, text });
        expect(res.createdAt).toBeA('number');
    });
});

describe('generateLocationUrlMessage', () => {

    it('should generate a correct message with URL', () => {
        const from = 'Admin';
        const latitude = 0.123456;
        const longitude = -10.98765;
        const url = 'https://www.google.com/maps?q=0.123456,-10.98765';

        const res = generateLocationUrlMessage(from, latitude, longitude);

        expect(res.url).toBe(url);
        expect(res.createdAt).toBeA('number');
    });
});