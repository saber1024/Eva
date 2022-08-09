import Environment from "./Environment.js";


class Eva {
    constructor(global) {
        this._global = global;
    }

    eval(exp, env = this._global) {
        /**
         * self expression part
         */
        if (this.isNumber(exp)) {
            return exp;
        }

        if (this.isString(exp)) {
            return exp.slice(1, -1);
        }

        if (this.isAddition(exp)) {
            return this.eval(exp[1], env) + this.eval(exp[2], env);
        }
        /**
         * Math part
         */
        if (exp[0] === "*") {
            return this.eval(exp[1], env) * this.eval(exp[2], env);
        }

        if (exp[0] === "-") {
            return this.eval(exp[1], env) - this.eval(exp[2], env);
        }

        if (exp[0] === "/") {
            return this.eval(exp[1], env) / this.eval(exp[2], env);
        }

        if (exp[0] === "%") {
            return this.eval(exp[1], env) / this.eval(exp[2], env);
        }

        /**
                 * compare part
                 */

        if (exp[0] === '>') {
            if (typeof exp[1] === 'string' && typeof exp[2] === 'string') {
                return env.compare('>', exp[1], exp[2])
            } else if (typeof exp[1] === 'string') {
                const left = env.lookup(exp[1])
                return left > exp[2]
            } else if (typeof exp[2] === 'string') {
                const left = env.lookup(exp[2])
                return left > exp[1]
            }
            else {
                return this.eval(exp[1], env) > this.eval(exp[2], env)
            }
        }

        if (exp[0] === '<') {
            if (typeof exp[1] === 'string' && typeof exp[1] === 'string') {
                return env.compare('<', exp[1], exp[2])
            } else if (typeof exp[1] === 'string') {
                const left = env.lookup(exp[1])
                return left < exp[2]
            } else if (typeof exp[2] === 'string') {
                const left = env.lookup(exp[2])
                return left < exp[1]
            } else {
                return this.eval(exp[1], env) < this.eval(exp[2], env)
            }
        }

        if (exp[0] === '==') {
            if (typeof exp[1] === 'string' && typeof exp[1] === 'string') {
                return env.compare('==', exp[1], exp[2])
            } else if (typeof exp[1] === 'string') {
                const left = env.lookup(exp[1])
                return left === exp[2]
            } else if (typeof exp[2] === 'string') {
                const left = env.lookup(exp[2])
                return left === exp[1]
            } else {
                return this.eval(exp[1], env) === this.eval(exp[2], env)
            }
        }

        if (exp[0] === '>=') {
            if (typeof exp[1] === 'string' && typeof exp[1] === 'string') {
                return env.compare('>=', exp[1], exp[2])
            } else if (typeof exp[1] === 'string') {
                const left = env.lookup(exp[1])
                return left >= exp[2]
            } else if (typeof exp[2] === 'string') {
                const left = env.lookup(exp[2])
                return left >= exp[1]
            } else {
                return this.eval(exp[1], env) >= this.eval(exp[2], env)
            }
        }

        if (exp[0] === '<=') {
            if (typeof exp[1] === 'string' && typeof exp[1] === 'string') {
                return env.compare('>=', exp[1], exp[2])
            } else if (typeof exp[1] === 'string') {
                const left = env.lookup(exp[1])
                return left <= exp[2]
            } else if (typeof exp[2] === 'string') {
                const left = env.lookup(exp[2])
                return left <= exp[1]
            } else {
                return this.eval(exp[1], env) >= this.eval(exp[2], env)
            }
        }

        /**
         * variable part
         */
        if (exp[0] === "var") {
            const [_, name, value] = exp;
            return env.define(name, this.eval(value, env));
        }

        /**
         * [+=, x, 20] = [+, x, 20]
         * 
         */
        if (exp[0] === '+=') {
            return this.eval(['set', exp[1],
                this.eval(['+', this.eval(exp[1], env),
                    this.eval(exp[2], env), env],
                    env)], env)
        }
        /**
         * -=
         */
        if (exp[0] === '-=') {
            return this.eval(['set', exp[1],
                this.eval(['-', this.eval(exp[1], env),
                    this.eval(exp[2], env), env],
                    env)], env)
        }
        /**
         * *=
         */
        if (exp[0] === '*=') {
            return this.eval(['set', exp[1],
                this.eval(['*', this.eval(exp[1], env),
                    this.eval(exp[2], env), env],
                    env)], env)
        }
        /**
         *  /=
         */
        if (exp[0] === '/=') {
            return this.eval(['set', exp[1],
                this.eval(['/', this.eval(exp[1], env),
                    this.eval(exp[2], env), env],
                    env)], env)
        }
        /**
         *  ++
         */
        if (exp[0] === '++') {
            return this.eval(['set', exp[1],
                this.eval(['+', this.eval(exp[1], env),
                    this.eval(1, env), env],
                    env)], env)
        }
        /**
         * --
         */
        if (exp[0] === '--') {
            return this.eval(['set', exp[1],
                this.eval(['-', this.eval(exp[1], env),
                    this.eval(1, env), env],
                    env)], env)
        }

        if (this.isVariableName(exp)) {
            return env.lookup(exp);
        }



        /**
         * Block part
         */
        if (this.isBlock(exp)) {
            const blockEnv = new Environment({}, env)
            return this._eval_Block(exp, blockEnv)
        }

        if (exp[0] === 'set') {
            const [_, name, value] = exp;
            return env.assign(name, this.eval(value, env));
        }

        if (exp[0] === 'while') {
            const [_, condition, body] = exp
            while (this.eval(condition, env) === false) {
                this.eval(body, env)
            }
            return 0
        }

        /**
         * If part
         */
        if (exp[0] === 'if') {
            return this._eval_if(exp, env)
        }

        throw new ReferenceError(`This ${JSON.stringify(exp, null, 2)} type is unimplemented!!`);

    }

    isNumber(exp) {
        return typeof exp === "number";
    }

    isString(exp) {
        return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
    }

    isAddition(exp) {
        return exp[0] === "+";
    }

    isBlock(exp) {
        return exp[0] === 'begin';
    }

    isVariableName(exp) {
        return typeof exp === 'string' && /^[a-zA-Z][a-zA-z0-9_]*$/.test(exp);
    }



    _eval_Block(exp, env) {
        let result;

        const [_, ...expression] = exp;

        for (const exp in expression) {
            result = this.eval(expression[exp], env)
        }

        return result
    }

    _eval_if(exp, env) {
        const [_, condition, trueSt, falseSt] = exp

        const result = this.eval(condition, env)

        return result ? this.eval(trueSt, env) : this.eval(falseSt, env)
    }
}


export default Eva
