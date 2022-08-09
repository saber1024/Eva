import Eva from '../../Eva.js'
import Environment from '../../Environment.js';
class TestUtil {
    constructor() {
        this.eva = new Eva(
            new Environment({
                null: null,
                true: true,
                false: false,
                Version: 1.0,
            })
        );
    }

    test(exp) {
        return this.eva.eval(exp)
    }
}

export default TestUtil