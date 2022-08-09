import assert from 'assert'

const math_test = (eva) => {
    assert.deepEqual(eva.eval(["+", ["+", 2, 5], 5]), 12);
    assert.deepEqual(eva.eval(["+", ["*", 2, 5], 5]), 15);
    assert.deepEqual(eva.eval(["+", ["/", 10, 5], 5]), 7);
    assert.deepEqual(eva.eval(["+", ["%", 10, 5], 5]), 7);
}

export default math_test