const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {

    it('should generate a correct message object', () => {
        const from = "TestMan";
        const text = "Sample test";

        const res = generateMessage(from, text);

        // expect(res.from).toBe(from);
        // expect(res.text).toBe(text);
        expect(res).toInclude({ from, text });
        expect(res.createdAt).toBeA('number');
    });
})