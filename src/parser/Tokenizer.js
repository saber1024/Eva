const Spec = [
    [/^\s+/, null],
    [/^\/\/.*/, null],
    [/^\/\*[\s\S]*?\*\//, null],
    [/^;/, ";"],
    [/^\{/, "{"],
    [/^}/, "}"],
    [/^\(/, '('],
    [/^\)/, ')'],
    [/^,/, ","],
    [/^\./, "."],
    [/^\[/, "["],
    [/^]/, "]"],
    [/^\bbegin\b/, "begin"],
    [/^\bclass\b/, "class"],
    [/^\bextends\b/, "extends"],
    [/^\bthis\b/, "this"],
    [/^\bsuper\b/, "super"],
    [/^\bfunc\b/, "func"],
    [/^\blet\b/, "let"],
    [/^\bvar\b/, "var"],
    [/^\bif\b/, "if"],
    [/^\bwhile\b/, "while"],
    [/^\bdo\b/, "do"],
    [/^\bfor\b/, "for"],
    [/^\belse\b/, "else"],
    [/^\btrue\b/, "true"],
    [/^\bfalse\b/, "false"],
    [/^\bnull\b/, "null"],
    [/^\breturn\b/, "RETURN"],
    [/^\bnew\b/, "new"],

    [/^\breturn\b/, "RETURN"],

    [/^[=!]=/, "EQUALITY_OPERATOR"],

    [/^\d+/, "NUMBER"],
    [/^\w+/, "IDENTIFIRE"],

    [/^=/, "SIMPLE_ASSIGN"],
    [/^[*\/+\-]=/, "COMPLEX_ASSIGN"],
    [/^[+\-]/, "AddtiveOperator"],
    [/^[*\/]/, "Multiplier"],
    [/^[><]=?/, "Relation_Operator"],

    [/^&&/, "LOGIC_AND_OPERATOR"],
    [/^\|\|/, "LOGIC_OR_OPERATOR"],
    [/^!/, "LOGIC_NOT"],

    [/^"[^"]*"/, "STRING"],
    [/^'[^']*'/, "STRING"],
];

class Tokenizer {
    init(string) {
        this._string = string;
        this._cursor = 0;
    }

    hasMoreTokens() {
        return this._cursor < this._string.length;
    }

    isEOF() {
        return this._cursor === this._string.length;
    }

    getNextToken() {
        if (!this.hasMoreTokens()) {
            return null;
        }
        // console.log(this._cursor);
        const string = this._string.slice(this._cursor);

        // console.log(string)

        for (const [regex, tokenType] of Spec) {
            const result = this._match(regex, string);
            if (result === null) {
                continue;
            }

            if (tokenType === null) {
                return this.getNextToken();
            }

            return {
                type: tokenType,
                value: result
            };
        }

        throw SyntaxError("UnSupport token type");
    }

    _match(regex, string) {
        const matched = regex.exec(string);
        if (matched === null) {
            return null;
        }

        this._cursor += matched[0].length;
        return matched[0];
    }
}
export default Tokenizer