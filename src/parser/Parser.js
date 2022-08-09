import Tokenizer from "./Tokenizer.js"

class Parser {
    constructor() {
        this.string = ''
        this.token = new Tokenizer()
    }

    parse(exp) {
        this.string = exp
        this.token.init(exp)
        this.lookahead = this.token.getNextToken()
        return this.Program()
    }

    /**
     * ( + exp + )
     */

    Program() {
        return this.StatementLiteral().statements
    }

    StatementLiteral() {
        let statements = []
        do {
            statements.push(this.Statement())
        } while (this.lookahead != null)
        return {
            statements: statements[0]
        }
    }

    Statement() {
        switch (this.lookahead.type) {
            case "{":
                return this.BlockStatement().exps
            case "(":
                return this.BracketStatement()
            default:
                return this.Expression()
        }
    }

    BracketStatement() {
        let exps = []
        this._eat("(")
        do {
            exps.push(this.Statement())
        } while (this.lookahead.type !== ")")
        this._eat(")")
        return exps
    }


    BlockStatement() {
        this._eat("{")
        let exps = []
        do {
            exps.push(this.Statement())
        } while (this.lookahead.type !== "}")
        this._eat("}")
        return {
            exps
        }
    }


    Expression() {

        let value;

        value = this.lookahead.type === 'NUMBER' ? Number.parseInt(this.lookahead.value) : this.lookahead.value

        this._eat(this.lookahead.type)
        return value
    }

    //Primary Tool func
    _eat(tokenType) {
        const token = this.lookahead;

        if (token === null) {
            throw new SyntaxError(`Unexpect end input, expected ${tokenType}`);
        }

        if (token.type !== tokenType) {
            throw new SyntaxError(
                `Unexpected Token ${token.type}, expected ${tokenType}`
            );
        }

        this.lookahead = this.token.getNextToken();

        return token;
    }
}

export default Parser

const parser = new Parser()
const result = parser.parse(`
   {
          begin
          (var x 0)
          (var result 0)
          (while ( < x 10) 
             {
                begin 
                (+= x 1)
                (+= result 1)
             }
          )
          result
      }
`)

console.log(result);