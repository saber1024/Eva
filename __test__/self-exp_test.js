import assert from 'assert'

const self_exp_test = (eva) => {
    assert.deepEqual(eva.eval(10), 10)
    assert.deepEqual(eva.eval('"hello"'), "hello")
}

export default self_exp_test