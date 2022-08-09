import assert from "assert";

const block_test = (eva) => {
    assert.deepEqual(eva.eval(['begin',
        ['var', 'x', 10],
        ['var', 'y', 20],
        ['+', ['*', 'x', 'y'], 10]
    ]), 210)


    assert.deepEqual(eva.eval(['begin',
        ['var', 'x', 10],
        [
            'begin',
            [
                'var', 'x', 20
            ],
            'x'
        ],
        'x'
    ]), 10)

    assert.deepEqual(eva.eval([
        'begin',
        ['var', 'value', 10],
        ['var', 'result',
            ['begin',
                ['+', 'value', 10]
            ],
        ],
        'result'
    ]), 20)

    assert.deepEqual(eva.eval([
        'begin',
        ['var', 'x', 10],
        ['begin',
            ['set', 'x', 20]
        ],
        'x'
    ]), 20)

    assert.deepEqual(eva.eval([
        'begin',
        ['var', 'x', 20],
        ['+=', 'x', 30],
        'x'
    ]), 50)

    assert.deepEqual(eva.eval([
        'begin',
        ['var', 'x', 20],
        ['-=', 'x', 30],
        'x'
    ]), -10)

    assert.deepEqual(eva.eval([
        'begin',
        ['var', 'x', 20],
        ['--', 'x'],
        'x'
    ]), 19)

    assert.deepEqual(eva.eval([
        'begin',
        ['var', 'x', 20],
        ['++', 'x'],
        'x'
    ]), 21)

    assert.deepEqual(eva.eval([
        'begin',
        ['var', 'x', 20],
        ['*=', 'x', 10],
        'x'
    ]), 200)

    assert.deepEqual(eva.eval([
        'begin',
        ['var', 'x', 20],
        ['/=', 'x', 10],
        'x'
    ]), 2)
}

export default block_test