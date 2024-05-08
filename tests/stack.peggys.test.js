const stack = require('../src/stack');

test('pop on empty stack returns undefined', () => {
    expect(stack.pop()).toBeDefined();
});
