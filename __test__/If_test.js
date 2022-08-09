import assert from "assert";


function if_test(eva) {

    assert.deepEqual(eva.eval([
        'begin',
        ['if', ['>', 20, 15],
            ['set', 'x', 30],
            ['set', 'y', 20]
        ],
        'x',
    ]), 30)

    assert.deepEqual(eva.eval([
        'begin',
        ['if', ['<', 20, 15],
            ['set', 'x', 30],
            ['set', 'y', 20]
        ],
        'y',
    ]), 20)

    assert.deepEqual(eva.eval([
        'begin',
        ['var', 'x', 20],
        ['var', 'y', 10],
        ['if', ['>', 'x', 'y'],
            ['set', 'x', 30],
            ['set', 'y', 20]
        ],
        'x',
    ]), 30)
    assert.deepEqual(eva.eval([
        'begin',
        ['var', 'x', 20],
        ['var', 'y', 10],
        ['if', ['<', 'x', 'y'],
            ['set', 'x', 30],
            ['set', 'y', 20]
        ],
        'y',
    ]), 20)
}

export default if_test