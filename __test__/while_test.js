import assert from "assert";

function while_test(eva) {
    assert.deepEqual(eva.eval([
        'begin',
        ['var', 'x', 0],
        ['var', 'result', 0],
        ['while',
            ['==', 'x', 5],
            [
                'begin',
                ['++', 'result'],
                ['++', 'x']
            ],
        ], 'result'
    ]), 6)
}

export default while_test