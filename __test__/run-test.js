import Eva from "../src/Eva.js";
import Environment from "../src/Environment.js";

import math_test from "./math_test.js";
import variable_test from "./variable_test.js";
import self_exp_test from "./self-exp_test.js";
import block_test from "./block_test.js";
import if_test from "./If_test.js";
import while_test from "./while_test.js";

const eva = new Eva(
    new Environment({
        null: null,
        true: true,
        false: false,
        Version: 1.0,
    })
);

const run = () => {
    [math_test, variable_test, self_exp_test, block_test, if_test, while_test].forEach((test) => {
        test(eva);
    });
};

run();

console.log("all test pass!!!");
