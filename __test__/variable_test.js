import assert from "assert";

function variable_test(eva) {
    assert.deepEqual(eva.eval(["var", "x", 10]), 10);
    assert.deepEqual(eva.eval('x'), 10);
    assert.deepEqual(eva.eval(["var", "y", 10]), 10);

    assert.deepEqual(eva.eval('y'), 10);

    assert.deepEqual(eva.eval(['var', 'isUser', 'false']), false);
}

export default variable_test